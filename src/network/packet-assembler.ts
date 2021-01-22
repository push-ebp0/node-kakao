/*
 * Created on Mon Jan 18 2021
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

import { LocoPacket, LocoPacketDataCodec } from "../packet/loco-packet";
import { createIdGen } from "../util/id-generator";

/**
 * Construct LocoPacket object from packet data.
 * Deconstruct LocoPacket into packet data.
 */
export class PacketAssembler<T, R> {

    private _idGenerator: Generator<number>;
    private _dataCodec: LocoPacketDataCodec<T, R>;

    constructor(dataCodec: LocoPacketDataCodec<T, R>) {
        this._idGenerator = createIdGen();
        this._dataCodec = dataCodec;
    }

    /**
     * Construct LocoPacket with given method and data
     * 
     * @param method 
     * @param data 
     */
    construct(method: string, data: T): LocoPacket {
        const packetData = this._dataCodec.encode(data);

        return {
            header: {
                id: this._idGenerator.next().value,
                method,
                status: 0,
            },
            data: packetData
        };
    }

    /**
     * Deconstruct LocoPacket into data.
     * This method can throw error if the type is not supported by codec.
     * 
     * @param packet 
     */
    deconstruct(packet: LocoPacket): R {
        if (!this._dataCodec.canDecode(packet.data[0])) throw `Cannot decode dataType ${packet.data[0]}`;

        return this._dataCodec.decode(packet.data[1]);
    }

}