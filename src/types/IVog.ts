import { VogConcept } from "../enums/vog/VogConceptEnum";
import { VogSex } from "../enums/vog/VogSexEnum";
import { VogStyle } from "../enums/vog/VogStyleEnum";
import { VogSubsPermissions } from "../enums/vog/VogSubPermissionsEnum";

export interface IVog {
    id: string;
    authorId: string;
    description: string | null;
    medias: string[];
    likeCount: number;
    commentCount: number;
    viewsCount: number;
    vogStyles: VogStyle[];
    concepts: VogConcept[];
    sex: VogSex;
    subsPermission: VogSubsPermissions;
    isSponsored: boolean;
    hashtags: string[];
    vogProducts: string[];
    creationDate: string;
    lastUpdateDate: string | null;
    isDeleted: boolean;
  }