import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import { generateFinding, validateUniswapPair } from "./utils";
import { SWAP_EVENT } from "./constants";

export function provideHandleTransaction(): HandleTransaction {
  return async (txEvent: TransactionEvent) => {
    const findings: Finding[] = [];
    //filter for the swap event being emitted
    txEvent.filterLog(SWAP_EVENT).forEach((swapEvent) => {
      const eventName = swapEvent.name;
      const tokenPoolAddress = swapEvent.address;
      const { sender, recipient, amount0, amount1 } = swapEvent.args;

      //validate and return findings
      if (!validateUniswapPair(tokenPoolAddress)) {
        return findings;
      } else {
        findings.push(generateFinding(eventName, sender, recipient, amount0, amount1, tokenPoolAddress));
      }
    });
    return findings;
  };
}

export default {
  handleTransaction: provideHandleTransaction(),
};
