export type Fault = {
    id: string;
    date: Date;
    refRoll: string;
    faultLength: number;
    time: Date;
    faultTypeId: string;
    remarks: string | null;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  };
  
  export type FaultType = {
    id: string;
    faultType: string;
    faultCode: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  };