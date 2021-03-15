import DirectoryActionTypes from './directory.types';
export const showDirectory = item => (
    {
        type: DirectoryActionTypes.DIRECTORY_ITEMS,
        payload:item
    });

    
