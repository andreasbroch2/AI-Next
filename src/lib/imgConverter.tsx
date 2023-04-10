import Image from "next/image";
import React from "react";
const parse = require('html-react-parser');


export default function imgConverter(element) {
  var cleanElement = element.replace(/\n/g, '');
  cleanElement = cleanElement.replace(/href="https:\/\/dksmarthome\.ditsmartehjem\.dk/g, 'href="https://dksmarthome.dk');
  var cleanJsx = parse(cleanElement);
  var imgNumber = 0;
  function reactNodeToImg(node) {
    return React.Children.map(node, (node) => {
      if(node.type === 'a'){
      }
      if (!node.type) {
        return node;
      }
      if (node.type === 'img') {
        if(imgNumber === 0){
          imgNumber++;
        return React.createElement(Image, { src: node.props.src, alt: node.props.alt, width: node.props.width, height: node.props.height, priority: true})
        }
        else{
          imgNumber++;
          if(node.props.width && node.props.height){
            return React.createElement(Image, { src: node.props.src, alt: node.props.alt, width: node.props.width, height: node.props.height})
          }else {
          return React.createElement(Image, { src: node.props.src, alt: node.props.alt, width: 1000, height: 1000})
          }
        }

      }
      else if (node.props && node.props.children != null) {
        React.Children.map(node.props.children, (child) => {
          if (typeof child === 'string') {
            return React.createElement('string', {}, child)
          }
        })
        return React.cloneElement(node, {}, reactNodeToImg(node.props.children));
      }
      else {
        return React.cloneElement(node, {}, null);
      }
    })
  }
  const dom = React.Children.map(cleanJsx, (elementchild) => {
    if (!elementchild.type) {
      return;
    }
    if (elementchild.props.className === "yarpp yarpp-related yarpp-related-website yarpp-template-thumbnails"
    ) {
      return;
    }
    else if (elementchild.props && elementchild.props.children) {
      return React.cloneElement(elementchild, {}, reactNodeToImg(elementchild.props.children));
    }
    else {
      return elementchild;
    }
  })
  return dom;
}
