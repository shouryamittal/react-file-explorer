import { fireEvent, screen, render } from '@testing-library/react';
import App from './containers/app';
import MenuOptionsList from './components/menu/menuOptionsList';
import Consts from './constants/menuListOpts';
import FolderContainer from './containers/folderContainer';
import MenuOption from './components/menu/menuOption';
import Folder from './components/folder/folder';

test('renders the app correctly', () => {
  const {getByTestId} = render(<App />);
  expect(getByTestId("appContainer")).toBeTruthy();
});

test('renders the menu list correctly', () => {
  const {getByTestId} = render(<MenuOptionsList menuOptions={Consts.MENU_LIST} selectedOpt='home'/>);
  expect(getByTestId("menuList")).toBeTruthy();
});

test('renders folderContainer correctly', () => {
  let folders = [{name:'abcd', level: 0, parent: 'root'},{name:'efgh', level: 0, parent: 'root'},{name:'ijkl', level: 0, parent: 'root'}];
  const {getByTestId} = render(<FolderContainer level={0} parent={'root'} folders={folders} menuOpt={'home'}/>);
  expect (getByTestId('folderContainer')).toBeTruthy();
});

test('renders folderContainer correctly with no folders', () => {
  const {getByTestId} = render(<FolderContainer level={0} parent={'root'} folders={[]} menuOpt={'home'}/>);
  expect (getByTestId('folderContainer')).toBeTruthy();
});

test('highlights selected menu option correctly', () => {
  function changeMenuOpt(id) {console.log(id)};
  const {getByTestId} = render(<MenuOption data={{id:'home', name:'Home'}} selectedOpt='home' changeMenuOpt={changeMenuOpt}/>);
  fireEvent.click(getByTestId('option'));
  expect(getByTestId('option')).toHaveAttribute('class', 'selected menuOption');
});

test('renders Context menu on right click on folderContainer', () => {
  const {getByTestId} = render(<FolderContainer level={0} parent={'root'} folders={[]} menuOpt={'home'}/>);
  fireEvent.contextMenu(getByTestId('folderContainer'));
  expect(getByTestId('ctxMenu')).toBeInTheDocument();
});

test('Shows Alter name popup on click of New Folder option', () => {
  //mock function
  function toggleSiteMask() {}
  
  const {getByTestId} = render(<FolderContainer level={0} parent={'root'} folders={[]} menuOpt={'home'} toggleSiteMask={toggleSiteMask}/>);
  fireEvent.contextMenu(getByTestId('folderContainer'));
  expect(getByTestId('ctxMenu')).toBeInTheDocument();
  fireEvent.click(getByTestId('New Folder'));
  expect(screen.queryByTestId('ctxMenu')).not.toBeInTheDocument();
  expect(getByTestId('popup')).toBeInTheDocument();
});

test('creates a folder on click of New Folder', () => {
  // mock funcitons
  function toggleSiteMask() {}
  function createFolder(){}

  const {getByTestId} = render(<FolderContainer level={0} parent={'root'} folders={[]} menuOpt={'home'} createFolder = {createFolder} toggleSiteMask={toggleSiteMask}/>);
  fireEvent.contextMenu(getByTestId('folderContainer'));
  expect(getByTestId('ctxMenu')).toBeInTheDocument();

  fireEvent.click(getByTestId('New Folder'));
  expect(getByTestId('popup')).toBeInTheDocument();
  let input = screen.getByPlaceholderText('Folder Name');
  fireEvent.change(input, {target: {value:'my-app'}});
  expect(input.value).toBe('my-app')
  fireEvent.submit(getByTestId('form'));
  expect(screen.queryByTestId('form')).not.toBeInTheDocument();
  expect(getByTestId('folder')).toBeInTheDocument();
});


test('shows ctxMenu on right click on folder', () => {
  let handleContextMenu = jest.fn();
  const {getByTestId} = render(<Folder name='dummy' handleContextMenu={handleContextMenu}/>);
  expect(getByTestId('folder')).toBeInTheDocument()
  fireEvent.contextMenu(getByTestId('folder'));
  expect(handleContextMenu).toHaveBeenCalledTimes(1);
  expect(getByTestId('ctxMenu')).toBeInTheDocument();
});

test('shows children folders of a folder on double click', () => {
  let  openFolder = jest.fn();
  const {getByTestId} = render(<Folder  name='dummy' openFolder={openFolder}/>);
  fireEvent.doubleClick(getByTestId('folder'));
  expect(openFolder).toHaveBeenCalled();
});
