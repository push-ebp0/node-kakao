/*
 * Created on Sun Jan 24 2021
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

import { Long } from "bson";
import { DisplayUserInfo, OpenChannelUserInfo } from "../user/channel-user-info";
import { OpenLinkComponent, OpenPrivilegeComponent, OpenTokenComponent } from "./open-link";
import { OpenChatUserPerm, OpenProfileType } from "./open-link-type";

export interface OpenLinkKickedUserInfo extends DisplayUserInfo {

    /**
     * Kicked channel id
     */
    kickedChannelId: Long;

}

export interface OpenLinkUserInfo extends OpenLinkComponent, OpenTokenComponent, OpenPrivilegeComponent {

    /**
     * nickname
     */
    nickname: string;

    /**
     * profile url
     */
    profileURL: string;

    /**
     * Full profile url
     */
    fullProfileURL: string;

    /**
     * Original profile url
     */
    originalProfileURL: string;

    /**
     * Link profile type
     */
    profileType: OpenProfileType;

    /**
     * Link chat user perm
     */
    perm: OpenChatUserPerm;

}

type OpenChannelUserInfoMix = OpenLinkComponent & OpenChannelUserInfo;
export interface OpenLinkChannelUserInfo extends OpenLinkUserInfo, OpenChannelUserInfoMix {

}