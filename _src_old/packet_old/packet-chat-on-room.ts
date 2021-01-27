/*
 * Created on Wed May 06 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { MemberStruct } from "../talk/struct_old/member-struct";
import { ChannelType } from "../talk/channel_old/channel-type";
import { JsonUtil } from "../util/json-util";
import { OpenMemberStruct, OpenLinkMemberStruct } from "../talk/struct_old/open/open-link-struct";
import { Serializer } from "json-proxy-mapper";

export class PacketChatOnRoomReq extends LocoBsonRequestPacket {

    constructor(
        public ChannelId: Long = Long.ZERO,
        public Token: Long = Long.ZERO,
        public OpenToken: number = -1,
    ) {
        super();
    }

    get PacketName(): string {
        return 'CHATONROOM';
    }

    toBodyJson() {
        let obj: any = {
            'chatId': this.ChannelId,
            'token': this.Token
        };

        if (this.OpenToken !== -1) obj['opt'] = this.OpenToken;

        return obj;
    }

}

export class PacketChatOnRoomRes extends LocoBsonResponsePacket {

    constructor(
        status: number,
        public ChannelId: Long = Long.ZERO,
        public MemberList?: (MemberStruct | OpenMemberStruct)[],
        public MemberIdList?: Long[],
        public Type: ChannelType = ChannelType.UNKNOWN,
        public WatermarkUserIdList: Long[] = [],
        public WatermarkList: Long[] = [],
        public OpenChatToken: number = 0,
        public ClientOpenProfile?: OpenLinkMemberStruct
    ) {
        super(status);
    }

    get PacketName(): string {
        return 'CHATONROOM';
    }

    readBodyJson(rawData: any) {
        this.ChannelId = JsonUtil.readLong(rawData['c']);

        this.Type = rawData['t'];
        if (rawData['w']) this.WatermarkList = rawData['w'];

        if (rawData['a']) this.WatermarkUserIdList = rawData['a'];

        this.MemberList = [];
        if (rawData['otk']) this.OpenChatToken = rawData['otk'];

        if (rawData['m']) {
            for (let rawMem of rawData['m']) {
                if (rawMem[OpenMemberStruct.Mappings.openToken]) this.MemberList.push(Serializer.deserialize<OpenMemberStruct>(rawMem, OpenMemberStruct.MAPPER));
                else this.MemberList.push(Serializer.deserialize<MemberStruct>(rawMem, MemberStruct.MAPPER));
            }
        }

        if (rawData['mi']) {
            this.MemberIdList = rawData['mi'];
        }

        if (rawData['olu']) this.ClientOpenProfile = Serializer.deserialize<OpenLinkMemberStruct>(rawData['olu'], OpenLinkMemberStruct.MAPPER);
    }

}