import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { Connection } from 'connection'
import { getConnectionName } from 'connection/utils'
import useOrderedConnections from 'hooks/useConnectors'
import useEagerlyConnect from 'hooks/useEagerlyConnect'
import { ReactNode } from 'react'

export default function Web3Provider({ children }: { children: ReactNode }) {
  useEagerlyConnect()
  const connections = useOrderedConnections()
  const connectors: [Connector, Web3ReactHooks][] = connections.map(({ hooks, connector }) => [connector, hooks])
  const key = connections.map(({ type }: Connection) => getConnectionName(type)).join('-')

  return (
    <Web3ReactProvider connectors={connectors} key={key}>
      {children}
    </Web3ReactProvider>
  )
}
