import fs from "fs"


class ProductManager{
    constructor(){
        this.path = "./files/Productos.json";
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)){
            const data = await fs.promises.readFile (this.path, "utf-8");
            if (data == ""){
                console.log([])
                return [];
            }else{
            const result = JSON.parse(data);
            console.log(result);
            return result;}
        }
    };
    

    addProducts = async (title, description, price ,thumbnail, code, stock,
    ) => {
        const productosIngresados = await this.getProducts();
        const producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        if (productosIngresados.length === 0){
            producto.id = 1
        }else {
            producto.id = productosIngresados[productosIngresados.length -1].id + 1;
        }

        const indiceProducto = productosIngresados.findIndex((e)=> e.code === code)

        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("faltan datos en su producto")
            return;
        }
        else if(indiceProducto === -1){
            productosIngresados.push(producto)
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(productosIngresados, null, "\t")
            )
                return producto;
        } else {
            
            console.log("producto ya ingresado")
            return;
        }
    
            

    }

   getProductsById = async (buscarId) => {
        const buscarProducto = await this.getProducts();
        const productoEncontrado = buscarProducto.find((e)=> e.id === buscarId );

        if(!productoEncontrado){
           console.log("producto no encontrado")
            return;
        }else{
            console.log(productoEncontrado)
        return productoEncontrado;
        }
    } 

    updateProducts = async (buscarId, title, description, price ,thumbnail, code, stock,) => {
        const buscarProducto = await this.getProducts();
        for (var i = 0; i < buscarProducto.length; i++)
        if(!buscarId || !title || !description || !price || !thumbnail || !code || !stock){
            console.log("faltan datos en su producto")
            return;
        }
        else if(buscarProducto[i].id === buscarId) {
            buscarProducto[i].title = title;
            buscarProducto[i].description = description;
            buscarProducto[i].price = price;
            buscarProducto[i].thumbnail = thumbnail;
            buscarProducto[i].code = code;
            buscarProducto[i].stock = stock;
            break;
          }
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(buscarProducto, null, "\t")
          );
            } ; 
        deleteProducts = async (buscarId) => {
            const buscarProductos = await this.getProducts();
            const borrarProducto = buscarProductos.findIndex((e) => e.id === buscarId);
            
            if(borrarProducto === -1){
               console.log("el producto solicitado no existe")
            } else {
                buscarProductos.splice(borrarProducto, 1);
            }
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(buscarProductos, null, "\t")
            )
            /*             
            buscarProductos.push(productosBorrados)
                await fs.promises.writeFile(
                this.path,
                JSON.stringify(buscarProductos, null, "\t")
              )  */
        }

}

let producto1 = new ProductManager();

const listaProductos = async () => {


await producto1.getProducts();

await producto1.addProducts("producto prueba","Este es un producto prueba", 200, "sin imagen", "abc123", 25);

await producto1.getProducts();

await producto1.getProductsById(1)

await producto1.getProductsById(5)

await producto1.updateProducts (1, "esto es un cambio al producto", "cambiando el producto");

await producto1.updateProducts (1, "esto es un cambio al producto", "cambiando el producto", 500, "nueva imagen", "codigonuevo", 10);

await producto1.deleteProducts(7) 

await producto1.deleteProducts(0)

}


listaProductos()