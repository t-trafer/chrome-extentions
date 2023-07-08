const MIME_TYPES = {
  PLAIN_TEXT: 'text/plain',
  HTML_TEXT: 'text/html',
};

const PRAnchorsHTMLCollection = document.getElementsByClassName('js-prefetch-document');
const PRAnchorsList = Array.from(PRAnchorsHTMLCollection);

// list all the PR urls if text/html mimeType pasting is not supported by the application
const getPlainBlobData = () => {
  const PRLinks = PRAnchorsList.map(i => i.href);
  const PRLinksText = PRLinks.join('\n');
  return [PRLinksText];
};

// list all the PR urls with PR's title displayed instead
const getHTMLBlobData = () => PRAnchorsList.flatMap(anchorNode => {
  const clonedAnchorNode = anchorNode.cloneNode(true);
  // sets the href to absolute path
  clonedAnchorNode.href = clonedAnchorNode.href;
  const clonedAnchorDOMString = clonedAnchorNode.outerHTML;
  return [clonedAnchorDOMString, '<br/>'];
});

const MIME_TYPE_BLOB_GETTER = {
  [MIME_TYPES.PLAIN_TEXT]: getPlainBlobData,
  [MIME_TYPES.HTML_TEXT]: getHTMLBlobData,
};

const getClipboardData = () => {
  const mimeTypesValue = Object.values(MIME_TYPES);
  return mimeTypesValue.reduce(
    (acc, mimeType) => {
      const blobData = MIME_TYPE_BLOB_GETTER[mimeType]();
      const blob = new Blob(blobData, { type: mimeType });
      return {
        ...acc,
        [mimeType]: blob,
      };
    },
    {}
  );
};

const asyncCopyPRLinks = async () => {
  const clipboardItemData = getClipboardData();
  const clipboardItem = [new ClipboardItem(clipboardItemData)];
  try {
    await navigator.clipboard.write(clipboardItem);
    console.log('PR Links Copied!')
  } catch (err) {
    console.error(`Failed to copy links :( ${err}`);
  }
};

const navControls = document.querySelector('.top-area > .nav-controls');
const copyElement = document.createElement("button");
copyElement.className = 'gl-button btn btn-md btn-default gl-mr-3 js-bulk-update-toggle'
copyElement.onclick = asyncCopyPRLinks;
copyElement.textContent = 'copy'
navControls?.prepend(copyElement)