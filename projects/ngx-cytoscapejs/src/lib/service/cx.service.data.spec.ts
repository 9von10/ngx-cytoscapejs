export const cx1ConvertibleInput = [
  {
    nodes: [
      { '@id': 1, n: 'A' },
      { '@id': 2, n: 'B' },
    ],
  },
  {
    edges: [{ '@id': 3, s: 1, t: 2 }],
  },
];

export const cx1ConvertedOutput = {
  options: {
    elements: {
      nodes: [
        {
          data: {
            id: 1,
            name: 'A',
          },
        },
        {
          data: {
            id: 2,
            name: 'B',
          },
        },
      ],
      edges: [
        {
          data: {
            id: 'e3',
            source: 1,
            target: 2,
          },
        },
      ],
    },
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#f6eecb',
          'background-opacity': 0.8,
          width: '40px',
          height: '40px',
          label: 'data(name)',
          'font-family': 'Roboto, sans-serif',
        },
      },
      {
        selector: 'edge',
        style: {
          'line-color': '#75736c',
          width: '2px',
          'font-family': 'Roboto, sans-serif',
          'text-opacity': 0.8,
          'curve-style': 'bezier',
        },
      },
      {
        selector: 'node:selected',
        style: {
          color: '#fb1605',
          'background-color': 'yellow',
        },
      },
      {
        selector: 'edge:selected',
        style: {
          label: 'data(interaction)',
          color: '#fb1605',
          'line-color': 'yellow',
          width: 6,
        },
      },
    ],
    layout: {
      name: 'preset',
      animate: false,
      numIter: 50,
      coolingFactor: 0.9,
      fit: false,
    },
    zoom: false,
    pan: false,
  },
  attributeNameMap: {},
  backgroundColor: null,
};

export const cx2ConvertibleInput = [
  {
    CXVersion: '2.0.0',
  },
  {
    nodes: [
      {
        id: 1,
        x: 0,
        y: 0,
      },
      {
        id: 2,
        x: 1,
        y: 1,
      },
    ],
  },
  {
    edges: [
      {
        id: 3,
        s: 1,
        t: 2,
      },
    ],
  },
  {
    visualProperties: [
      {
        default: {
          edge: {},
          network: {},
          node: {},
        },
      },
    ],
  },
];

export const cx2ConvertedOutput = {
  options: {
    'background-color': undefined,
    style: [
      {
        selector: 'node',
        style: {},
      },
      {
        selector: 'edge',
        style: {},
      },
    ],
    elements: {
      nodes: [
        {
          data: {
            id: '1',
          },
          position: {
            x: 0,
            y: 0,
          },
        },
        {
          data: {
            id: '2',
          },
          position: {
            x: 1,
            y: 1,
          },
        },
      ],
      edges: [
        {
          data: {
            id: '3',
            source: 1,
            target: 2,
          },
        },
      ],
    },
    layout: {},
  },
};

export const cx1ButNotCx2ConvertibleInput = [{ nodes: [{ '@id': 1, n: 'A' }] }];

export const cx1ButNotCx2ConvertibleConvertedOutput = {
  options: {
    elements: {
      nodes: [
        {
          data: {
            id: 1,
            name: 'A',
          },
        },
      ],
      edges: [],
    },
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#f6eecb',
          'background-opacity': 0.8,
          width: '40px',
          height: '40px',
          label: 'data(name)',
          'font-family': 'Roboto, sans-serif',
        },
      },
      {
        selector: 'edge',
        style: {
          'line-color': '#75736c',
          width: '2px',
          'font-family': 'Roboto, sans-serif',
          'text-opacity': 0.8,
          'curve-style': 'bezier',
        },
      },
      {
        selector: 'node:selected',
        style: {
          color: '#fb1605',
          'background-color': 'yellow',
        },
      },
      {
        selector: 'edge:selected',
        style: {
          label: 'data(interaction)',
          color: '#fb1605',
          'line-color': 'yellow',
          width: 6,
        },
      },
    ],
    layout: {
      name: 'preset',
      animate: false,
      numIter: 50,
      coolingFactor: 0.9,
      fit: false,
    },
    zoom: false,
    pan: false,
  },
  attributeNameMap: {},
  backgroundColor: null,
};

export const cx2ButNotCx1ConvertibleInput = [
  {
    CXVersion: '2.0.0',
  },
  {
    visualProperties: [
      {
        default: {
          edge: {},
          network: {},
          node: {},
        },
      },
    ],
  },
];

export const cx2ButNotCx1ConvertibleConvertedOutput = {
  options: {
    style: [
      {
        selector: 'node',
        style: {},
      },
      {
        selector: 'edge',
        style: {},
      },
    ],
    elements: {
      nodes: [],
      edges: [],
    },
    layout: {},
  },
};
