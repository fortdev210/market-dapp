import "./App.css"
import { WalletProvider } from "./hooks/WalletProvider"
import { WalletList } from "./components/wallet-list/wallet-list"
import { SelectedWallet } from "./components/selected-wallet/selected-wallet"
import { WalletError } from "./components/wallet-error/wallet-error"

function App() {
  return (
    <WalletProvider>
      <WalletList />
      <hr />
      <SelectedWallet />
      <WalletError />
    </WalletProvider>
  )
}

export default App