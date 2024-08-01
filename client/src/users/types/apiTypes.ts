type Create = {
  variant: 'create';
};

type Edit = {
  variant: 'edit';
  id: string;
};

export type Common = {
  email: string;
  name: string;
  states: string[];
  gender: string;
  languageSpoken: string[];
  skills: string[];
  registrationDatAndTime: string;
  formerEmploymentPeriod: [string, string];
  salaryRange: [number, number];
  isTeacher: boolean;
  students: {
    name: string;
  }[];
};

export type ApiCreateEdit = Common & (Create | Edit);
export type ApiGet = Edit & Common;
