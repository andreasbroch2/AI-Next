// Serverside renderet Table of Contents component. Accepts a html string and return a list of links to the headings in the string.
//

const cheerio = require('cheerio');


export default function ServerToc({ html }) {
    const $ = cheerio.load(html);

    const headings = [];
    let currentHeading = null;

    $('h2, h3').each((index, element) => {
        const level = element.tagName === 'h2' ? 2 : 3;
        const id = $(element).attr('id');
        const title = $(element).text();
      
        const heading = { level, id, title, items: [] };
      
        if (level === 2) {
          headings.push(heading);
          currentHeading = heading;
        } else if (level === 3 && currentHeading) {
          currentHeading.items.push(heading);
        }
      });
      
      // Format the headings into a nested list
      const nestedHeadings = headings.map(h2 => ({
        id: h2.id,
        title: h2.title,
        items: h2.items.map(h3 => ({
          id: h3.id,
          title: h3.title,
        })),
      }));
    console.log('headings: ', headings)
    console.log('nestedHeadings: ', nestedHeadings)
    return (
        <div className="toc">
            <h3 className="text-lg font-bold">Innhold</h3>
        </div>
    );
}

