import {approach1} from "./approach-1"
import {approach2} from "./approach-2"
import {approach3} from "./approach-3"

class ApproachesTester {
  private readonly expected: string

  public constructor(expected: string) {
    this.expected = expected
  }

  private didSomeApproachSucceed: boolean = false

  public readonly result: Array<{
    approachName: string
    result: "✅" | "❌"
    error: string
  }> = []

  public async testApproach(
    approach: () => string | Promise<string>,
    approachName: string
  ): Promise<void> {
    expect.assertions(0)
    try {
      // ---- RUN APPROACH ----
      const approachResult = await approach()

      // ---- VERIFY APPROACH RESULT ----
      if (approachResult !== this.expected) {
        this.result.push({approachName, result: "❌", error: ""})
      } else {
        this.didSomeApproachSucceed = true
        this.result.push({approachName, result: "✅", error: ""})
      }
    } catch (err) {
      // ---- HANDLE APPROACH ERROR ----
      const message = (err as {message?: string})?.message
      this.result.push({
        approachName,
        result: "❌",
        error: message ?? "",
      })
    }
  }

  public printResult(): void {
    console.table(this.result)
  }

  public verifyIfSomeApproachSucceed(): void {
    expect(this.didSomeApproachSucceed).toBeTruthy()
  }
}

describe("testing of approaches", () => {
  const EXPECTED_RESULT = "Ok"

  const tester = new ApproachesTester(EXPECTED_RESULT)

  afterAll(() => {
    tester.printResult()
    tester.verifyIfSomeApproachSucceed()
  })

  it.each`
    approach     | approachName
    ${approach1} | ${"First test approach"}
    ${approach2} | ${"Second test approach"}
    ${approach3} | ${"Third test approach"}
  `("should try run $approachName", async ({approach, approachName}) => {
    await tester.testApproach(approach, approachName)
  })
})
