export const config = {
  ESRI_API_KEY:
    "AAPKe45036761f9a497c9052a704b6ad049bIljfra2b59baaLxaoY6MAF4OjMPo9wn19vi-7xs-eG70Aoe1lXtH9WWAWsky2LeK",
  INIT_ZOOM: 21,
  INIT_CENTER: [-82.441999, 35.612209],

  LAYERS: [
    {
      url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0",
      title: "Drzewa",
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
            fieldName: "street",
            label: "Street",
          },
          {
            fieldName: "number",
            label: "Number",
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
