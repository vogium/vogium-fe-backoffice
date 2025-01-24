export enum VogSubsPermissions {
    PUBLIC = 'PUBLIC',
    TIER1 = 'TIER1',
    TIER2 = 'TIER2',
    TIER3 = 'TIER3',
  }
  
  export const VogSubsPermissionsLabels = {
    [VogSubsPermissions.PUBLIC]: "Public",
    [VogSubsPermissions.TIER1]: "Tier 1",
    [VogSubsPermissions.TIER2]: "Tier 2",
    [VogSubsPermissions.TIER3]: "Tier 3",
  };
  
  export const VogSubsPermissionsOptions = () => {
    return [
      {
        label: VogSubsPermissionsLabels[VogSubsPermissions.PUBLIC],
        value: VogSubsPermissions.PUBLIC,
        color: "text-blue-500",
      },
      {
        label: VogSubsPermissionsLabels[VogSubsPermissions.TIER1],
        value: VogSubsPermissions.TIER1,
        color: "text-green-500",
      },
      {
        label: VogSubsPermissionsLabels[VogSubsPermissions.TIER2],
        value: VogSubsPermissions.TIER2,
        color: "text-yellow-500",
      },
      {
        label: VogSubsPermissionsLabels[VogSubsPermissions.TIER3],
        value: VogSubsPermissions.TIER3,
        color: "text-red-500",
      },
    ];
  };
  
  export const getVogSubsPermissionsOption = (value: VogSubsPermissions) => {
    return VogSubsPermissionsOptions().find((option) => option.value === value);
  };