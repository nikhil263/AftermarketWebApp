export const SUBSCRIPTION_KEY='afde8a71a2084efeb617d4533c98d02d';
export const V2KEY='558c6251756c44ce9eacda5f6ffe34ca';
export const ADD_FILTER='ADD_FILTER';
export const UPDATE_FILTER='UPDATE_FILTER';
export const REMOVE_FILTER='REMOVE_FILTER';
export const REQUEST_HUB='REQUEST_HUB';
export const UPDATE_LAST_PAGE='UPDATE_LAST_PAGE';
export const UPDATE_STEP='UPDATE_STEP';
export const INCREMENT_STEP='INCREMENT_STEP';
export const DECREMENT_STEP='DECREMENT_STEP';
export const SET_TRUCK_MAKE='SET_TRUCK_MAKE';
export const REQUEST_ASSEMBLIES='REQUEST_ASSEMBLIES'
export const RECEIVE_ASSEMBLIES='RECEIVE_ASSEMBLIES'
export const INVALIDATE_ASSEMBLIES='INVALIDATE_ASSEMBLIES'
export const RECEIVE_HUBS='RECEIVE_HUBS'
export const REQUEST_HUBS='REQUEST_HUBS'
export const INVALIDATE_HUBS='INVALIDATE_HUBS'
export const SHOW_PREVIOUS_RESULT='SHOW_PREVIOUS_RESULT'
export const SHOW_NEXT_RESULT='SHOW_NEXT_RESULT'
export const SHOW_RESULT_AT_IDX='SHOW_RESULT_AT_IDX'
export const ASSEMBLY_RESULT='ASSEMBLY_RESULT';
export const SEARCH_ASSEMBLY_RESULT='SEARCH_ASSEMBLY_RESULT'
export const PARTS_RESULT='PARTS_RESULT';
export const RESET_FILTER='RESET_FILTER';

// initial states
export const APPSTATE = {
	isFetching: false,
	lastPath: '',
	step: 0
}
export const RESULTS = {
	receivedAt: '',
	type: '',
	selectedIdx: 0,
	total: 0,
	selected: {},
	items: [],
	isFetching: false
}
export const FILTERSTATE = {
	filterId: 0,
	partNumbers: '~',
	aftermarketPartTypeIds: 1,
	truckCompartmentIds: 1, //1 = Tractor
	dutyRatingIds: 1, // 1 = Heavy Duty
	brakeTypeIds: 1, // 1 = Drum Brakes,
	truckMakeIds: 1, // 1 = Freightliner
	axlePositionIds: '~',
	axleNameIds: '~',
	grossAxleWeightRatingRangeIds: '~',
	wheelTypeStudLengthIds: '~',
	searchText: ''
}

export const TRUCKMAKES = [
		{ id: 1, name: 'Freightliner', active: false},
		{ id: 2, name: 'Western Star', active: false},
		{ id: 3, name: 'Sterling', active: false},
		{ id: 4, name: 'Kenworth', active: false},
		{ id: 5, name: 'Peterbilt', active: false},
		{ id: 6, name: 'Volvo', active: false},
		{ id: 7, name: 'Mack', active: false},
		{ id: 8, name: 'Navistar', active: false}
];

export const FILTER_VALUES = [
  {
    Id: 0,
    Name: 'Part Number | Description | Part Type',
    Sort: 0
  },
  {
    'Id': 1,
    'Name': 'Part Type',
    'Sort': 1
  },
  {
    'Id': 2,
    'Name': 'Truck Compartment',
    'Sort': 2
  },
  {
    'Id': 3,
    'Name': 'Duty Rating',
    'Sort': 3
  },
  {
    'Id': 4,
    'Name': 'Brake Type',
    'Sort': 4
  },
  {
    'Id': 5,
    'Name': 'Truck Make',
    'Sort': 5
  },
  {
    'Id': 6,
    'Name': 'Axle Position',
    'Sort': 6
  },
  {
    'Id': 7,
    'Name': 'Axle Name',
    'Sort': 7
  },
  {
    'Id': 8,
    'Name': 'Gross Axle Weight Rating (GAWR) Range',
    'Sort': 8
  },
  {
    'Id': 9,
    'Name': 'Wheel Type / Stud Length',
    'Sort': 9
  }
]
export const DETAILS_TPL = {
	id: -1,
	image: 'hub-fpo.png',
	title: ''
}
export const AFTERMARKET_DETAILS = [
	{
		id: 10082200,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082201,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082202,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082203,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082204,
		material: 'Ductile Iron',
		title: 'Iron PreSet FF Front',
		image: 'IR-FF-0500.png'
	},
	{
		id: 10082205,
		material: 'Ductile Iron',
		title: 'Iron PreSet FF Front',
		image: 'IR-FF-0500.png'
	},
	{
		id: 10082206,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082207,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082208,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082209,
		material: 'Aluminum',
		title: 'Aluminum PreSet FF Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082210,
		material: 'Ductile Iron',
		title: 'Iron PreSet FF Front',
		image: 'IR-FF-0500.png'
	},
	{
		id: 10082211,
		material: 'Ductile Iron',
		title: 'Iron PreSet FF Front',
		image: 'IR-FF-0500.png'
	},
	{
		id: 10082212,
		material: 'Aluminum',
		title: 'Aluminum PreSet FL Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082213,
		material: 'Aluminum',
		title: 'Aluminum PreSet FL Front',
		image: 'AL-FF-0500.png'
	},
	{
		id: 10082214,
		material: 'Ductile Iron',
		title: 'Iron PreSet FL Front',
		image: 'IR-FL-0500.png'
	},
	{
		id: 10082215,
		material: 'Ductile Iron',
		title: 'Iron PreSet FL Front',
		image: 'IR-FL-0500.png'
	},
	{
		id: 10082216,
		material: 'Aluminum',
		title: 'Aluminum PreSet Rear Drive',
		image: 'AL-DR-0500.png'
	},
	{
		id: 10082217,
		material: 'Aluminum',
		title: 'Aluminum PreSet Rear Drive',
		image: 'AL-DR-0500.png'
	},
	{
		id: 10082218,
		material: 'Ductile Iron',
		title: 'Iron PreSet Rear Drive',
		image: 'IR-DR-0500.png'
	},
	{
		id: 10082219,
		material: 'Ductile Iron',
		title: 'Iron PreSet Rear Drive',
		image: 'IR-DR-0500.png'
	},
	{
		id: 10082220,
		material: 'Aluminum',
		title: 'Aluminum PreSet Rear Drive',
		image: 'AL-DR-0500.png'
	},
	{
		id: 10082221,
		material: 'Aluminum',
		title: 'Aluminum PreSet Rear Drive',
		image: 'AL-DR-0500.png'
	},
	{
		id: 10082222,
		material: 'Ductile Iron',
		title: 'Iron PreSet Rear Drive',
		image: 'IR-DR-0500.png'
	}
]

// id = 1 {
//     "Id": 1,
//     "Name": "Complete Hub Assembly"
//   },
// {
//     "Id": 7,
//     "Name": "PreSet Hub Assembly Complete Rebuild Kit (D Flat)"
//   },
//   {
//     "Id": 3,
//     "Name": "PreSet Hub Assembly Complete Rebuild Kit (Keyway)"
//   },
//   {
//     "Id": 2,
//     "Name": "PreSet/PresSet+ Rebuild Kit"
//   }

// id 2 = [
//   {
//     "Id": 0,
//     "Name": "—"
//   },
//   {
//     "Id": 1,
//     "Name": "Tractor"
//   }
// ]

// id 3 =[
//   {
//     "Id": 0,
//     "Name": "—"
//   },
//   {
//     "Id": 1,
//     "Name": "Heavy Duty"
//   }
// ]

// id 4 = [
//   {
//     "Id": 0,
//     "Name": "—"
//   },
//   {
//     "Id": 1,
//     "Name": "Drum Brakes"
//   }
// ]

// id 5 = [
//   {
//     "Id": 0,
//     "Name": "—"
//   },
//   {
//     "Id": 1,
//     "Name": "Freightliner"
//   }
// ]

// id 6 = [
//   {
//     "Id": 0,
//     "Name": "—"
//   },
//   {
//     "Id": 1,
//     "Name": "Drive"
//   },
//   {
//     "Id": 2,
//     "Name": "Front"
//   },
//   {
//     "Id": 3,
//     "Name": "Trailer"
//   }
// ]

// id 7 = [
//   {
//     "Id": 0,
//     "Name": "—"
//   },
//   {
//     "Id": 1,
//     "Name": "FF Front"
//   },
//   {
//     "Id": 2,
//     "Name": "FL Front"
//   },
//   {
//     "Id": 3,
//     "Name": "R Drive"
//   },
//   {
//     "Id": 4,
//     "Name": "TN Trailer"
//   },
//   {
//     "Id": 5,
//     "Name": "TP Trailer"
//   }
// ]

// id = 8 {
//     "Id": 1,
//     "GawrRange": "12,000 — 13,200 pounds\n(540 — 600 kg)"
//   },
//   {
//     "Id": 2,
//     "GawrRange": "More than 13,200 pounds\r\n(More than 600 kg)"
//   }

// Id 9 =[
//   {
//     "Id": 0,
//     "WheelType": "—",
//     "StudLength": "—"
//   },
//   {
//     "Id": 2,
//     "WheelType": "Aluminum Wheels",
//     "StudLength": "Long Studs"
//   },
//   {
//     "Id": 1,
//     "WheelType": "Steel Wheels",
//     "StudLength": "Short Studs"
//   }
// ]
