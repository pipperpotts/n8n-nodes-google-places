import {
	IExecuteFunctions,
	IHttpRequestMethods, // Added this import
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class GooglePlaces implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Google Places Pro',
		name: 'googlePlacesPro',
		icon: 'fa:map-marker-alt',
		group: ['transform'],
		version: 1,
		description: 'Search for places using the Google Places API (New)',
		defaults: {
			name: 'Google Places Pro',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'googlePlacesApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Text Query',
				name: 'textQuery',
				type: 'string',
				default: '',
				placeholder: 'e.g. Pizza in New York',
				required: true,
			},
			{
				displayName: 'Field Mask',
				name: 'fieldMask',
				type: 'string',
				default: 'places.id,places.displayName,places.formattedAddress',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const textQuery = this.getNodeParameter('textQuery', i) as string;
				const fieldMask = this.getNodeParameter('fieldMask', i) as string;
				const credentials = await this.getCredentials('googlePlacesApi');

				const options = {
					method: 'POST' as IHttpRequestMethods, // Fixed: Cast to valid method type
					headers: {
						'Content-Type': 'application/json',
						'X-Goog-Api-Key': credentials.apiKey as string,
						'X-Goog-FieldMask': fieldMask,
					},
					body: {
						textQuery,
					},
					url: `https://places.googleapis.com/v1/places:searchText`,
					json: true, // Let n8n handle the JSON parsing automatically
				};

				const responseData = await this.helpers.request(options);
				
				if (responseData.places) {
					const executionData = this.helpers.returnJsonArray(responseData.places);
					returnData.push(...executionData);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}