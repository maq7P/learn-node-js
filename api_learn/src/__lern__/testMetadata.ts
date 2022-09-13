import "reflect-metadata";

function Injectable(key: string) {
	return (target: Object) => {
		Reflect.defineMetadata(key, 1, target);
		const meta = Reflect.getMetadata(key, target);
		console.log(meta);
	};
}

function Inject(key: string) {
	return (target: Object, propertyKey: string) => {
		Reflect.defineMetadata(key, 1, target);
		const meta = Reflect.getMetadata(key, target);
		console.log(meta);
	};
}

function Prop(target: Object, name: string) {}

@Injectable("C")
export class C {
	@Prop prop: number;
}

@Injectable("D")
export class D {
	//@ts-ignore
	constructor(@Inject("C") c: C) {}
}
