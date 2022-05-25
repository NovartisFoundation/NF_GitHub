export const wrapParagraph = (paragraphs: string[]): JSX.Element[] =>
  // eslint-disable-next-line react/no-array-index-key
  paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>);

export const wrapList = (paragraphs: string[]): JSX.Element[] =>
  paragraphs.map((listItem, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={index} dangerouslySetInnerHTML={{ __html: listItem }} />
  ));
