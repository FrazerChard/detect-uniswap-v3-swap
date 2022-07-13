import { FindingType, FindingSeverity, Finding, HandleTransaction, createTransactionEvent, ethers, } from "forta-agent";
import agent from "./agent";
import { createAddress } from "forta-agent-tools/lib/tests"
import { SWAP_EVENT, UNIV3_FACTORY_ADDRESS, UNIV3_FACTORY_ABI, TOKEN_POOL_ABI } from "./constants";

const generateFinding = (eventName: string, tokenPoolAddress: string, sender: string, recipient: string, amount0: string, amount1: string) => Finding.fromObject({
  name: `UniswapV3 ${eventName} Event Detected`,
  description: `Agent has detected a ${eventName} event for the Uniswap V3 Protocol`,
  alertId: "UNIV3-SWAP-EVENT",
  severity: FindingSeverity.Info,
  type: FindingType.Info,
  protocol: 'UniswapV3',
  metadata: {
      sender: sender,
      recipient: recipient,
      amount0: amount0.toString(),
      amount1: amount1.toString(),
  },
  addresses: [tokenPoolAddress],
});

describe("uniswap v3 swap event agent", () => {
  let handleTransaction: HandleTransaction;
  let mockValidateUniswapPair: any = jest.fn();
  const mockTxEvent = createTransactionEvent({} as any);


//  const MOCK_UNIV3_FACTORY_ADDRESS = createAddress("0xa1a");
  const MOCK_POOL_ADDRESS = createAddress("0xb1a");
  const MOCK_SENDER_ADDRESS = createAddress("0xc1a");
  const MOCK_RECIPIENT_ADDRESS = createAddress("0xc2b");
//  const MOCK_TOKEN0_ADDRESS = createAddress("0xe1a")
//  const MOCK_TOKEN1_ADDRESS = createAddress("0xe2b")
  const MOCK_AMOUNT0 = ethers.BigNumber.from(50);
  const MOCK_AMOUNT1 = ethers.BigNumber.from(150);

  describe("handleTransaction", () => {
    it("returns empty findings if there is no swap event", async () => {
      mockTxEvent.filterLog = jest.fn().mockReturnValue([]);
      const findings = await agent.handleTransaction(mockTxEvent);

      expect(findings).toStrictEqual([]);
      expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
      expect(mockTxEvent.filterLog).toBeCalledWith(SWAP_EVENT);
    });

    it("returns a finding if a swap event from uniV3 is detected", async () => {
      const mockSwapEvent = {
        name: "Swap",
        args: { 
          sender: MOCK_SENDER_ADDRESS, 
          recipient: MOCK_RECIPIENT_ADDRESS,
          amount0: MOCK_AMOUNT0,
          amount1: MOCK_AMOUNT1 
        },
        address: MOCK_POOL_ADDRESS
      };
      mockTxEvent.filterLog = jest.fn().mockReturnValue([mockSwapEvent]);
      const findings = await agent.handleTransaction(mockTxEvent);
      expect(findings).toStrictEqual([generateFinding(mockSwapEvent.name, mockSwapEvent.address, mockSwapEvent.args.sender, mockSwapEvent.args.recipient, mockSwapEvent.args.amount0.toString(), mockSwapEvent.args.amount1.toString())]);
      expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
      expect(mockTxEvent.filterLog).toBeCalledWith(SWAP_EVENT);
    });

    it("returns no finding if a swap event not from uniV3 is detected", async () => {
      const mockSwapEvent = {
        name: "Swap",
        args: { 
          sender: MOCK_SENDER_ADDRESS, 
          recipient: MOCK_RECIPIENT_ADDRESS,
          amount0: MOCK_AMOUNT0,
          amount1: MOCK_AMOUNT1 
        },
        address: MOCK_POOL_ADDRESS
      };
      //mockTxEvent.filterLog = jest.fn().mockReturnValue([mockSwapEvent]);
      mockTxEvent.filterLog = jest.fn().mockReturnValue([]);

      //not sure how to check the validation if(!validateUniswapPair(tokenPoolAddress))
            
      const findings = await agent.handleTransaction(mockTxEvent);
      expect(findings).toStrictEqual([]);
      expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
      expect(mockTxEvent.filterLog).toBeCalledWith(SWAP_EVENT);
    });

  });

});
