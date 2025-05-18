
declare interface docType {
	static info: {
	static title: string;

	static description: string;
	};

	static host: string;

	static basePath: string;

	static schemes: any[];

	static securityDefinitions: {
	static bearerAuth: {
		static type: string;

		static scheme: string;

		static bearerFormat: string;
	};
	};

	static security: (any | any[])[];
}
