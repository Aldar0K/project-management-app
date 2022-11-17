import * as Yup from 'yup';
import i18next, { t } from 'i18next';

export const validation = Yup.object().shape({
  login: Yup.string()
    .required(i18next.t(`Error.logReq` as const) as string)
    .min(2, i18next.t(`Error.logMin` as const) as string)
    .max(20, i18next.t(`Error.logMax` as const) as string),
  name: Yup.string()
    .required(i18next.t(`Error.nameReq` as const) as string)
    .min(2, i18next.t(`Error.nameMin` as const) as string)
    .max(20, i18next.t(`Error.nameMax` as const) as string),
  password: Yup.string()
    .required(i18next.t(`Error.passReq` as const) as string)
    .min(6, i18next.t(`Error.passMin` as const) as string),
});
