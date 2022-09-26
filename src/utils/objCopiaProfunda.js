export default function objCopiaProfunda(obj) {
	if (!(typeof obj === "object") || obj === null) return obj;

	const valorInicialReduce = Array.isArray(obj) ? [] : {};

	return Object.entries(obj).reduce((acc, [key, value]) => {
		acc[key] = objCopiaProfunda(value);
		return acc;
	}, valorInicialReduce);
}
