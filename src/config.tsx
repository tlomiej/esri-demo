export const config = {
  ESRI_API_KEY:
    "AAPKe45036761f9a497c9052a704b6ad049bIljfra2b59baaLxaoY6MAF4OjMPo9wn19vi-7xs-eG70Aoe1lXtH9WWAWsky2LeK",
  INIT_ZOOM: 6,
  SEARCH_URL: "https://services.gugik.gov.pl/uug/?request=GetAddress",
  EXTEND: {
    xmin: 14.12298,
    ymin: 49.00205,
    xmax: 24.14585,
    ymax: 54.83578,
  },

  LAYERS: [
    {
      id:'3',
      url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0",
      title: "Drzewa",
    },
    {
      id:'34',
      url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0",
      title: "Drzewa1",
    },
    {
      id:'35',
      url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0",
      title: "Drzewa2",
    },
    {
      id:'36',
      url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0",
      title: "Drzewa3",
    },
  ],

  ADDRESS_POPUPTEMPLATE: {
    title: "Address",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "city",
            label: "City",
          },
          {
            fieldName: "code",
            label: "Code",
          },
          {
            fieldName: "street",
            label: "Street",
          },
          {
            fieldName: "number",
            label: "Number",
          },
          {
            fieldName: "teryt",
            label: "TERYT",
          },
          {
            fieldName: "simc",
            label: "SIMC",
          },
          {
            fieldName: "ulic",
            label: "ULIC",
          },
      
          {
            fieldName: "x",
            label: "X",
          },
          {
            fieldName: "y",
            label: "Y",
          },
        ],
      },
    ],
  },
};
