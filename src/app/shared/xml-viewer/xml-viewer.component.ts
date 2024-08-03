import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-xml-viewer',
  templateUrl: './xml-viewer.component.html',
  styleUrl: './xml-viewer.component.css'
})
export class XmlViewerComponent implements OnChanges {
  
  
  @Input() fileContent: string | ArrayBuffer | null = null;

  displayContent: string | null = null;


  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['fileContent'].currentValue ){
      this.displayContent = null;
      return;
    }

    this.displayContent = this.formatXml(this.fileContent as string)
  }

  formatXml(xml: string): string {
    let formatted = '';
    const reg = /(>)(<)(\/*)/g;
    let pad = 0;
    xml = xml.replace(reg, '$1\r\n$2$3');
    xml.split('\r\n').forEach((node: string, index: number) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }

      const padding = new Array(pad + 1).join('  ');
      formatted += padding + node + '\r\n';
      pad += indent;
    });

    return formatted;
  }
}
