
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';


const RPC_URLS = {
	1: 'https://mainnet.infura.io/v3/68c1d5701b71424999d3f11264af6b14',
	4: 'https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4'
};


//metamask
export const injected = new InjectedConnector({
	supportedChainIds: [ 1, 4, 31337, 43114, 56, 250, 137, 1285, 1284, ]
});



//coinbase
export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[1],
	supportedChainIds: [ 1, 4 ]
});

export const walletConnect = new WalletConnectConnector({
	rpc: {
		1: RPC_URLS[1]
	},
	bridge: "https://bridge.walletconnect.org",
	qrcode: true,
	pollingInterval: 15000
})

export function resetWalletConnector(connector) {
	if (connector && connector instanceof WalletConnectConnector) {
		connector.walletConnectProvider = undefined;
	}
}

