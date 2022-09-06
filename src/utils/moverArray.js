export default function moverArray(arr, index_antigo, novo_index) {
    const nova_arr = [...arr]

    while (index_antigo < 0) {
        index_antigo += nova_arr.length;
    }
    while (novo_index < 0) {
        novo_index += nova_arr.length;
    }
    if (novo_index >= nova_arr.length) {
        var k = novo_index - nova_arr.length + 1;
        while (k--) {
            nova_arr.push(undefined);
        }
    }
    nova_arr.splice(novo_index, 0, nova_arr.splice(index_antigo, 1)[0]);
    return nova_arr; // for testing purposes
};