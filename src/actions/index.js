export * from './auth';
export * from './user';

export const readState = () => {
  return {
    type: 'READ_STATE',
    payload: {}
  };
};
