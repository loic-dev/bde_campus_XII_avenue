import "./rowPanelHome.style.scss";

export const  RowPanelHome = ({page}) => {
    let contenue
    if (page === "homePage") {
        contenue =  <h1>Présentation</h1> 
    }else{
            contenue = <h1>Titre</h1>
    }

    return (
        <div class="rowPanelHome">
            <div class="rowPanelHomeImage">
                <img href="#"></img>
            </div>
            <div>
                {contenue}
                <div class="rowPanelHomeTxt">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                </div>
            </div>
        </div>   
    )
}