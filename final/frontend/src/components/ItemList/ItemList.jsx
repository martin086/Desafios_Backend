import Item from "../Item/Item";
//Modifico el array de objetos. 
const ItemList = ({productsList}) => {
    return (
        <>
            {productsList.map(product => <Item key={product.id} prod={product}/>)}
        </>  
        
    );
} 

export default ItemList;