import "./rowPanelHome.style.scss";

export const  RowPanelHome = ({page}) => {
    let contenue
    console.log(page)
    if (page == "homePage") {
        contenue =  <h1>HomePage</h1> 
    }else{
            contenue = <h1>Présentation</h1>
    }

    return (
       contenue 
    )
}