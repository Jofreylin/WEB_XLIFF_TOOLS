import { Component } from '@angular/core';
import * as xmljs from 'xml-js';

@Component({
  selector: 'app-unifier',
  templateUrl: './unifier.component.html',
  styleUrl: './unifier.component.css'
})
export class UnifierComponent {

  xmlInput1: string | ArrayBuffer | null = null;
  xmlInput2: string | ArrayBuffer | null = null;
  xmlOutput: string | ArrayBuffer | null = null;

  constructor(){

  }

  onFileChange(event: any, fileType: number) {


    const file = event.target.files[0];

    if(!file){
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {

      if (fileType === 1) {
        this.xmlInput1 = reader.result;
      } else if (fileType === 2) {
        this.xmlInput2 = reader.result;
      }

    };

    reader.readAsText(file);
  }

  doJob(){
    this.xmlOutput = this.copyTargetFromOtherFile(this.xmlInput1 as string, this.xmlInput2 as string);
  }

  private copySourceToTarget(xmlString: string): string {
    const options = { compact: true, spaces: 2 };
    const parsedXml = xmljs.xml2js(xmlString, options) as any;
    const transUnits = parsedXml.xliff.file.body['trans-unit'];
    
    for (const transUnit of transUnits) {
      const source = transUnit.source;
      let target = transUnit.target;

      if (source) {
        if (!target) {
          transUnit.target = source;
        }

      }
    }

    const newXmlString = xmljs.js2xml(parsedXml, options);
    return newXmlString;
  }

  private copyTargetFromOtherFile(xmlString1: string, xmlString2: string): string {
    const options = { compact: true, spaces: 2 };
    const file1_parsedXml = xmljs.xml2js(xmlString1, options) as any;
    const file2_parsedXml = xmljs.xml2js(xmlString2, options) as any;

    try{
      const file1_transUnits = file1_parsedXml.xliff.file.body['trans-unit'];

      const file2_transUnits = file2_parsedXml.xliff.file.body['trans-unit'];

      const sourceToTargetMap: { [key: string]: any } = {};

      for (const transUnit of file1_transUnits) {
        if (transUnit.source && transUnit.target) {
          sourceToTargetMap[JSON.stringify(transUnit.source)] = transUnit.target;
        }
      }

      for (const transUnit of file2_transUnits) {
        if (transUnit.source && sourceToTargetMap[JSON.stringify(transUnit.source)]) {
          transUnit.target = sourceToTargetMap[JSON.stringify(transUnit.source)];
        }
      }
      

    }catch(e){
      console.error('Error processing file:', e);
      alert('Error processing file:');
    }

    const newXmlString = xmljs.js2xml(file2_parsedXml, options);
    return newXmlString;

    
  }


  downloadFile() {

    const data: string = this.xmlOutput as string;
    const fileExtension = 'xlf';
    const filename = `translated.${fileExtension}`


    try{
      const blob = new Blob([data], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }finally{
    }
    
  }

  clearInput(){
    this.xmlInput1 = null;
    this.xmlInput2 = null;
    this.xmlOutput = null;
  }


}
