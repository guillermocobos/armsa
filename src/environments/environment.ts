// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  RECAPTCHA_KEY: "6LeH8EcUAAAAAKCABLfu0V2hDkydl8-Raqhai01m",
  RECAPTCHA_SECRET: "6LeH8EcUAAAAAGkZtyO88nx-fJzp0xqTu_GRYxLM",
  API_SERVER: "http://localhost:3001/api",
  //API_SERVER: "https://armsa-dev.dgrmsalta.gov.ar/api",
  STATIC_SERVER: "http://localhost:3001/static",
  DECIDIR_URL: "https://developers.decidir.com/api/v2",
  DECIDIR_API_KEY_PUBLIC: "XXXXXXXXXXX",
  DECIDIR_API_KEY_PRIVATE: "XXXXXXXXXXXXXXX",
  DECIDIR_TIMEOUT: 0,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
