import "./bdeDescription.style.scss";
import img from "../../images/LogoBDE2.png"


export const  BdeDescription = ({}) => {
    return (

        <div class="rowContainer">
            <div class="bdeDescription">
            <h2>Le bde campus 12 avenue c'est quoi ?</h2>
            <div class="component">
                <div class="bdeDescriptionTxt">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                <div><img  class="logoBdeDescription" src={img}></img></div>
            </div>
        </div> 
        </div>
          
    )
}
