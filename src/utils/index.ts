import { ALL_CHAINS, Chain, ChainId } from '@pangolindex/sdk';
import { getAddress } from '@ethersproject/address'

export function isAddress(value: any): string | false {
    try {
        return getAddress(value);
    } catch {
        return false;
    }
}

export function getChainByNumber(chainId: ChainId | number): Chain | undefined {
    return ALL_CHAINS.find((chain) => chain.chain_id === chainId);
}