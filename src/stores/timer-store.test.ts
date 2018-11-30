import { getEnv, getRoot, types } from "mobx-state-tree"
import { Environment } from "../app/environment"
import { TimerStore } from "./timer-store"
import { UserModel } from "../models/user"

import * as Time from "../services/time"

const env = new Environment()
// @ts-ignore: Just for testing anyway, the tests should blow up if the api-mock is wrong
env.api = {
  // @ts-ignore: Just for testing anyway, the tests should blow up if the api-mock is wrong
  addToTimer: (time, deviceId) => {
    return Promise.resolve([])
  },
}

const RootStoreModel = types.model("RootStore").props({
  timerStore: types.optional(TimerStore, {}),
  userStore: UserModel,
})

const rootStore = RootStoreModel.create(
  {
    userStore: {
      deviceId: "lol",
    },
  },
  env,
)

const store = rootStore.timerStore

test("Starting a countdown should set the timeLeft to the duration of the timer", async () => {
  store.setTimer({
    state: "Active",
    duration: Time.minutes(2),
  })
  store.startCountDown()
  expect(Time.asSeconds(store.timeLeft)).toEqual(Time.asSeconds(Time.minutes(2)))
})

describe("animation delay", () => {
  describe("when the time left is greater than the halfwaypoint", () => {
    beforeEach(() => {
      store.setTimer({
        state: "Active",
        duration: Time.minutes(60),
      })
      store.startCountDown()

      // Pretend that 5 minutes have passed
      store.setTimeLeft(Time.minutes(30))
    })

    test("it should delay the animation by how much time until the halfwaypoint is reached", async () => {
      // 60 mins
      // 30 minutes has passed
      // add 10 minutes

      // total to show: 40mins
      // delay the animation 10 minutes
      // start the animation from 30 to 0
      const { animationDelay } = await store.increaseTimedAlarm(Time.minutes(10))
      expect(Time.asMinutes(animationDelay)).toEqual(Time.asMinutes(Time.minutes(10)))
    })
  })

  describe("when the time left is less than the halfwaypoint", () => {
    beforeEach(() => {
      store.setTimer({
        state: "Active",
        duration: Time.minutes(60),
      })
      store.startCountDown()

      // Pretend that 50 minutes have passed
      store.setTimeLeft(Time.minutes(10))
    })

    test("it should not delay the animation at all", async () => {
      // 60 mins timer
      // after 50 mins
      // increase by 10

      // time left: 20
      // delay: 20-30 = -10
      const { animationDelay, timeLeft } = await store.increaseTimedAlarm(Time.minutes(10))
      expect(Time.asMinutes(timeLeft)).toEqual(Time.asMinutes(Time.minutes(20)))

      expect(Time.asMinutes(animationDelay)).toEqual(Time.asMinutes(Time.minutes(0)))
    })
  })
})

describe("Adding more time than the initial duration should increase the timer's duration", () => {
  // if the difference between the current time and the time to add is larger than 100%,
  // for example: we have 5 minutes left and add 10mins.
  // then restart the counter
  // and set the counter's initialTime to the new time

  describe("Adding 11 minutes to a 1 minute timer", () => {
    beforeEach(() => {
      store.setTimer({
        state: "Active",
        duration: Time.minutes(1),
      })
      store.startCountDown()
    })

    test("should increase the duration to 12 minutes", async () => {
      const { timedAlarm } = await store.increaseTimedAlarm(Time.minutes(11))
      expect(Time.asMinutes(timedAlarm!.duration!)).toEqual(Time.asMinutes(Time.minutes(12)))
    })

    test("should increase the timeLeft to 12 minutes", async () => {
      await store.increaseTimedAlarm(Time.minutes(11))
      expect(Time.asMinutes(store.timeLeft)).toEqual(Time.asMinutes(Time.minutes(12)))
    })

    test("should set the halfwaypoint to 6 mins", async () => {
      const { halfwayPoint } = await store.increaseTimedAlarm(Time.minutes(11))
      expect(Time.asSeconds(halfwayPoint)).toEqual(Time.asSeconds(Time.minutes(6)))
    })

    test("should set the animationPercentage to 0", async () => {
      const { animationPercentage } = await store.increaseTimedAlarm(Time.minutes(11))
      // because timeleft is higher than halfway
      expect(animationPercentage).toEqual(0)
    })
  })

  describe("Adding 10 minutes to a 30 minute timer at the 25 minute mark", () => {
    beforeEach(() => {
      store.setTimer({
        state: "Active",
        duration: Time.minutes(30),
      })
      store.startCountDown()

      // Pretend that 5 minutes have passed
      store.setTimeLeft(Time.minutes(25))
    })

    test("should increase the duration to 35 minutes", async () => {
      const { timedAlarm } = await store.increaseTimedAlarm(Time.minutes(10))
      expect(Time.asMinutes(timedAlarm!.duration!)).toEqual(Time.asMinutes(Time.minutes(35)))
    })

    test("should increase the timeLeft to 35 minutes", async () => {
      await store.increaseTimedAlarm(Time.minutes(10))
      expect(Time.asMinutes(store.timeLeft)).toEqual(Time.asMinutes(Time.minutes(35)))
    })

    test("should set the halfwaypoint to 17.5 mins", async () => {
      const { halfwayPoint } = await store.increaseTimedAlarm(Time.minutes(10))
      expect(Time.asSeconds(halfwayPoint)).toEqual(Time.asSeconds(Time.minutes(17.5)))
    })

    test("should set the animationPercentage to 0", async () => {
      const { animationPercentage } = await store.increaseTimedAlarm(Time.minutes(10))
      // because timeleft is higher than halfway
      expect(animationPercentage).toEqual(0)
    })
  })
})

describe("Adding less time than the current duration, before crossing the halfway point", () => {
  describe("Adding 10 minutes to a 60 minute timer, at the 30 minute mark", () => {
    beforeEach(() => {
      // for example: we start with 60mins have 30 minutes left and add 10mins that means:
      // The time should be: 40min.
      // The halfwaypoint should be 30mins.
      store.setTimer({
        state: "Active",
        duration: Time.minutes(60),
      })
      store.startCountDown()

      // Pretend that 30 minutes have passed
      store.setTimeLeft(Time.minutes(30))
    })

    test("should keep the duration the same", async () => {
      const { timedAlarm } = await store.increaseTimedAlarm(Time.minutes(10))
      expect(Time.asSeconds(timedAlarm!.duration!)).toEqual(Time.asSeconds(Time.minutes(60)))
    })

    test("should set the time to X minutes", async () => {
      await store.increaseTimedAlarm(Time.minutes(10))
      expect(Time.asSeconds(store.timeLeft)).toEqual(Time.asSeconds(Time.minutes(40)))
    })

    test("should not update the halfwayPoint", async () => {
      const { halfwayPoint } = await store.increaseTimedAlarm(Time.minutes(10))
      expect(Time.asSeconds(halfwayPoint)).toEqual(Time.asSeconds(Time.minutes(30)))
    })

    test("the animationPercentage should be 0 zero because the timeleft is larger than the halfwaypoint", async () => {
      const { animationPercentage } = await store.increaseTimedAlarm(Time.minutes(10))
      expect(animationPercentage).toEqual(0)
    })
  })

  describe("Adding 1 minute to a 2 minute timer, at the 45 seconds left mark", () => {
    beforeEach(() => {
      store.setTimer({
        state: "Active",
        duration: Time.minutes(2),
      })
      store.startCountDown()
      store.setTimeLeft(Time.seconds(45))
    })

    test("should keep the duration the same", async () => {
      const { timedAlarm } = await store.increaseTimedAlarm(Time.minutes(1))
      expect(Time.asSeconds(timedAlarm!.duration!)).toEqual(Time.asSeconds(Time.minutes(2)))
    })

    test("should set the time left to 1 minute and 45 seconds", async () => {
      await store.increaseTimedAlarm(Time.minutes(1))
      expect(Time.asSeconds(store.timeLeft)).toEqual(
        Time.asSeconds(Time.add(Time.minutes(1), Time.seconds(45))),
      )
    })

    test("should not update the halfwayPoint", async () => {
      const { halfwayPoint } = await store.increaseTimedAlarm(Time.minutes(1))
      expect(Time.asSeconds(halfwayPoint)).toEqual(Time.asSeconds(Time.minutes(1)))
    })

    test("should set the animationPercentage to 0%", async () => {
      const { animationPercentage } = await store.increaseTimedAlarm(Time.minutes(1))
      expect(animationPercentage).toEqual(0)
    })

    test("should set the animationDelay to 45 seconds (45 seconds left to the halfway point)", async () => {
      const { animationDelay } = await store.increaseTimedAlarm(Time.minutes(1))
      expect(Time.asSeconds(animationDelay)).toEqual(Time.asSeconds(Time.seconds(45)))
    })
  })
})

describe("Adding less time than the current duration, with the halfway point crossed", () => {
  describe("Adding 10 minutes to a 60 minuter timer, at the 10 minute mark", () => {
    beforeEach(() => {
      // for example: we start with 60mins have 10 minutes left and add 10mins that means:
      // The time should be: 20min.
      // The halfwaypoint should be 30mins.
      // The animation should be orangey (less than 10)
      store.setTimer({
        state: "Active",
        duration: Time.minutes(60),
      })
      store.startCountDown()

      // Pretend that 50 minutes have passed
      store.setTimeLeft(Time.minutes(10))
    })

    test("should keep the duration the same", async () => {
      const { timedAlarm } = await store.increaseTimedAlarm(Time.minutes(10))
      expect(Time.asSeconds(timedAlarm!.duration!)).toEqual(Time.asSeconds(Time.minutes(60)))
    })

    test("should set the time left to 20 minutes", async () => {
      await store.increaseTimedAlarm(Time.minutes(10))
      expect(Time.asSeconds(store.timeLeft)).toEqual(Time.asSeconds(Time.minutes(20)))
    })

    test("should not update the halfwayPoint", async () => {
      const { halfwayPoint } = await store.increaseTimedAlarm(Time.minutes(10))
      expect(Time.asSeconds(halfwayPoint)).toEqual(Time.asSeconds(Time.minutes(30)))
    })

    test("should set the animationPercentage to be around 33%", async () => {
      const { animationPercentage } = await store.increaseTimedAlarm(Time.minutes(10))
      expect(animationPercentage).toEqual(33.333333333333336)
    })

    test("should set the animationDelay to 0", async () => {
      const { animationDelay } = await store.increaseTimedAlarm(Time.minutes(10))
      expect(Time.asSeconds(animationDelay)).toEqual(Time.asSeconds(Time.seconds(0)))
    })
  })

  describe("Adding 5 minutes to a 30 minutes timer, at the 5 minute mark", () => {
    beforeEach(() => {
      store.setTimer({
        state: "Active",
        duration: Time.minutes(30),
      })
      store.startCountDown()
      store.setTimeLeft(Time.minutes(5))
    })

    test("should keep the duration the same", async () => {
      const { timedAlarm } = await store.increaseTimedAlarm(Time.minutes(5))
      expect(Time.asSeconds(timedAlarm!.duration!)).toEqual(Time.asSeconds(Time.minutes(30)))
    })

    test("should set the time left to 10 minutes", async () => {
      await store.increaseTimedAlarm(Time.minutes(5))
      expect(Time.asSeconds(store.timeLeft)).toEqual(Time.asSeconds(Time.minutes(10)))
    })

    test("should not update the halfwayPoint", async () => {
      const { halfwayPoint } = await store.increaseTimedAlarm(Time.minutes(5))
      expect(Time.asSeconds(halfwayPoint)).toEqual(Time.asSeconds(Time.minutes(15)))
    })

    test("should set the animationPercentage to 66%", async () => {
      const { animationPercentage } = await store.increaseTimedAlarm(Time.minutes(5))
      expect(animationPercentage).toEqual(33.333333333333336)
    })
  })

  describe("Adding 1 minute to a 8 minute timer, at the 1 minute mark", () => {
    beforeEach(() => {
      store.setTimer({
        state: "Active",
        duration: Time.minutes(8),
      })
      store.startCountDown()
      store.setTimeLeft(Time.minutes(1))
    })

    test("should keep the duration the same", async () => {
      const { timedAlarm } = await store.increaseTimedAlarm(Time.minutes(1))
      expect(Time.asSeconds(timedAlarm!.duration!)).toEqual(Time.asSeconds(Time.minutes(8)))
    })

    test("should set the time left to 2 minutes", async () => {
      await store.increaseTimedAlarm(Time.minutes(1))
      expect(Time.asSeconds(store.timeLeft)).toEqual(Time.asSeconds(Time.minutes(2)))
    })

    test("should not update the halfwayPoint", async () => {
      const { halfwayPoint } = await store.increaseTimedAlarm(Time.minutes(1))
      expect(Time.asSeconds(halfwayPoint)).toEqual(Time.asSeconds(Time.minutes(4)))
    })

    test("should set the animationPercentage to 50%", async () => {
      const { animationPercentage } = await store.increaseTimedAlarm(Time.minutes(1))
      expect(animationPercentage).toEqual(50)
    })

    test("should set the animationDelay to 0", async () => {
      const { animationDelay } = await store.increaseTimedAlarm(Time.minutes(1))
      expect(Time.asSeconds(animationDelay)).toEqual(Time.asSeconds(Time.seconds(0)))
    })
  })
})
