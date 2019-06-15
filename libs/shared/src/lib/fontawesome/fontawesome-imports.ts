import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaintBrush, faStream, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';

export function fontawesomeImports() {
  library.add(faStream, faPaintBrush, faWindowMaximize);
}
