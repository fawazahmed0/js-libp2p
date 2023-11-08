import { logger } from '@libp2p/logger'
import { protocols } from '@multiformats/multiaddr'
import { equals as uint8ArrayEquals } from 'uint8arrays'
import { Message } from '../../message/index.js'
import {
  removePrivateAddresses,
  removePublicAddresses
} from '../../utils.js'
import type { PeerRouting } from '../../peer-routing/index.js'
import type { DHTMessageHandler } from '../index.js'
import type { PeerId } from '@libp2p/interface/peer-id'
import type { PeerInfo } from '@libp2p/interface/peer-info'
import type { AddressManager } from '@libp2p/interface-internal/address-manager'

const log = logger('libp2p:kad-dht:rpc:handlers:find-node')

export interface FindNodeHandlerInit {
  peerRouting: PeerRouting
  lan: boolean
}

export interface FindNodeHandlerComponents {
  peerId: PeerId
  addressManager: AddressManager
}

export class FindNodeHandler implements DHTMessageHandler {
  private readonly peerRouting: PeerRouting
  private readonly lan: boolean
  private readonly components: FindNodeHandlerComponents

  constructor (components: FindNodeHandlerComponents, init: FindNodeHandlerInit) {
    const { peerRouting, lan } = init

    this.components = components
    this.peerRouting = peerRouting
    this.lan = Boolean(lan)
  }

  /**
   * Process `FindNode` DHT messages
   */
  async handle (peerId: PeerId, msg: Message): Promise<Message> {
    log('incoming request from %p for peers closer to %b', peerId, msg.key)

    let closer: PeerInfo[] = []

    if (uint8ArrayEquals(this.components.peerId.toBytes(), msg.key)) {
      closer = [{
        id: this.components.peerId,
        multiaddrs: this.components.addressManager.getAddresses().map(ma => ma.decapsulateCode(protocols('p2p').code))
      }]
    } else {
      closer = await this.peerRouting.getCloserPeersOffline(msg.key, peerId)
    }

    closer = closer
      .map(this.lan ? removePublicAddresses : removePrivateAddresses)
      .filter(({ multiaddrs }) => multiaddrs.length)

    const response = new Message(msg.type, new Uint8Array(0), msg.clusterLevel)

    if (closer.length > 0) {
      response.closerPeers = closer
    } else {
      log('could not find any peers closer to %b than %p', msg.key, peerId)
    }

    return response
  }
}