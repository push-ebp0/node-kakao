/*
 * Created on Sun Jun 14 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

import { Long } from "bson";
import { OpenUserInfo } from "../user_old/chat-user";
import { OpenLinkType } from "./open-link-type";
import { RequestResult } from "../../request/request-result";
import { LinkPrivilegeMask, OpenLinkReactionInfo } from "../struct_old/open/open-link-struct";

export interface OpenLink<I extends OpenUserInfo = OpenUserInfo> {

    readonly LinkId: Long;

    readonly LinkName: string;

    readonly OpenToken: number;
    
    readonly LinkType: OpenLinkType;

    readonly LinkURL: string;

    readonly LinkCoverURL: string;

    readonly LinkOwnerInfo: I;

    readonly Description: string;
    readonly TagList: string[];

    readonly Searchable: boolean;

    readonly CreatedAt: number;

    readonly Activated: boolean;

    readonly PrivilegeMask: Long;

    hasPrivilege(type: LinkPrivilegeMask): boolean;

    requestReactionInfo(): Promise<RequestResult<OpenLinkReactionInfo>>;

}

export interface OpenLinkProfile extends OpenLink {

    readonly MaxChannelLimit: number;

}

export interface OpenLinkChannel extends OpenLink {

    readonly MaxUserLimit: number;

}