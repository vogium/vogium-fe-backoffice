export enum VogConcept {
    WEDDING = 'WEDDING',
    CONCERT = 'CONCERT',
    BUSINESS = 'BUSINESS',
    DAILY = 'DAILY',
    GYM = 'GYM',
    OUTDOOR_SPORTS = 'OUTDOOR_SPORTS',
    BEACH = 'BEACH',
    FORMAL_EVENT = 'FORMAL_EVENT',
    DATE_NIGHT = 'DATE_NIGHT',
    SPORTING_EVENT = 'SPORTING_EVENT',
    COCKTAIL_PARTY = 'COCKTAIL_PARTY',
    THEME_PARTY = 'THEME_PARTY',
    TRAVEL = 'TRAVEL',
    FESTIVAL = 'FESTIVAL',
    INTERVIEW = 'INTERVIEW',
    BIRTHDAY_PARTY = 'BIRTHDAY_PARTY',
    AFTER_PARTY = 'AFTER_PARTY',
    SKIING_WINTER_EVENT = 'SKIING_WINTER_EVENT',
    DINNER_PARTY = 'DINNER_PARTY',
    GRADUATION_CEREMONY = 'GRADUATION_CEREMONY',
    RELIGIOUS_CEREMONY = 'RELIGIOUS_CEREMONY',
    THEATRE_BALLET = 'THEATRE_BALLET',
    HALLOWEEN = 'HALLOWEEN',
    CHRISTMAS = 'CHRISTMAS',
  }
  
  export const VogConceptLabels = {
    [VogConcept.WEDDING]: "Wedding",
    [VogConcept.CONCERT]: "Concert",
    [VogConcept.BUSINESS]: "Business",
    [VogConcept.DAILY]: "Daily",
    [VogConcept.GYM]: "Gym",
    [VogConcept.OUTDOOR_SPORTS]: "Outdoor Sports",
    [VogConcept.BEACH]: "Beach",
    [VogConcept.FORMAL_EVENT]: "Formal Event",
    [VogConcept.DATE_NIGHT]: "Date Night",
    [VogConcept.SPORTING_EVENT]: "Sporting Event",
    [VogConcept.COCKTAIL_PARTY]: "Cocktail Party",
    [VogConcept.THEME_PARTY]: "Theme Party",
    [VogConcept.TRAVEL]: "Travel",
    [VogConcept.FESTIVAL]: "Festival",
    [VogConcept.INTERVIEW]: "Interview",
    [VogConcept.BIRTHDAY_PARTY]: "Birthday Party",
    [VogConcept.AFTER_PARTY]: "After Party",
    [VogConcept.SKIING_WINTER_EVENT]: "Skiing Winter Event",
    [VogConcept.DINNER_PARTY]: "Dinner Party",
    [VogConcept.GRADUATION_CEREMONY]: "Graduation Ceremony",
    [VogConcept.RELIGIOUS_CEREMONY]: "Religious Ceremony",
    [VogConcept.THEATRE_BALLET]: "Theatre Ballet",
    [VogConcept.HALLOWEEN]: "Halloween",
    [VogConcept.CHRISTMAS]: "Christmas",
  };
  
  export const VogConceptOptions = () => {
    return Object.values(VogConcept).map((concept) => ({
      label: VogConceptLabels[concept],
      value: concept,
    }));
  };
  
  export const getVogConceptOption = (value: VogConcept) => {
    return VogConceptOptions().find((option) => option.value === value);
  };
  