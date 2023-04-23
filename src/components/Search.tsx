import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import useSearch, { SEARCH_STATE_LOADED } from '../hooks/use-search';

const SEARCH_VISIBLE = 'visible';
const SEARCH_HIDDEN = 'hidden';

export default function Search({classes}) {
    const formRef: any = useRef();

    const [searchVisibility, setSearchVisibility] = useState(SEARCH_HIDDEN);
    const { query, results, search, clearSearch, state } = useSearch({ maxResults: 5});
    const searchIsLoaded = state === SEARCH_STATE_LOADED;

    // When the search visibility changes, we want to add an event listener that allows us to
    // detect when someone clicks outside of the search box, allowing us to close the results
    // when focus is drawn away from search

    useEffect(() => {
        // If we don't have a query, don't need to bother adding an event listener
        // but run the cleanup in case the previous state instance exists
        console.log('useEffect')
        if (searchVisibility === SEARCH_HIDDEN) {
            removeDocumentOnClick();
            return;
        }
        addDocumentOnClick();
        addResultsRoving();

        // When the search box opens up, additionall find the search input and focus
        // on the element so someone can start typing right away

        const searchInput: any = Array.from(formRef.current.elements).find((input: any) => input.type === 'search');

        searchInput.focus();

        return () => {
            removeResultsRoving();
            removeDocumentOnClick();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchVisibility]);

    function addDocumentOnClick() {
        document.body.addEventListener('click', handleOnDocumentClick, true);
    }

    function removeDocumentOnClick() {
        document.body.removeEventListener('click', handleOnDocumentClick, true);
    }

    function handleOnDocumentClick(e) {
        if (!e.composedPath().includes(formRef.current)) {
            setSearchVisibility(SEARCH_HIDDEN);
            clearSearch();
        }
    }

    function handleOnSearch({ currentTarget }) {
        search({
            query: currentTarget.value,
        });
    }

    const handleOnToggleSearch2 = () => {
        console.log('handleOnToggleSearch');
        setSearchVisibility(SEARCH_VISIBLE);
    }

    function addResultsRoving() {
        document.body.addEventListener('keydown', handleResultsRoving);
    }

    function removeResultsRoving() {
        document.body.removeEventListener('keydown', handleResultsRoving);
    }
    
    function handleResultsRoving(e) {
        const focusElement: any = document.activeElement;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (focusElement.nodeName === 'INPUT' && focusElement.nextSibling.children[0].nodeName !== 'P') {
                focusElement.nextSibling.children[0].firstChild.firstChild.focus();
            } else if (focusElement.parentElement.nextSibling) {
                focusElement.parentElement.nextSibling.firstChild.focus();
            } else {
                focusElement.parentElement.parentElement.firstChild.firstChild.focus();
            }
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (focusElement.nodeName === 'A' && focusElement.parentElement.previousSibling) {
                focusElement.parentElement.previousSibling.firstChild.focus();
            } else {
                focusElement.parentElement.parentElement.lastChild.firstChild.focus();
            }
        }
    }

    // pressing esc while search is focused will close it
    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            clearSearch();
            setSearchVisibility(SEARCH_HIDDEN);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false);

        return () => {
            document.removeEventListener('keydown', escFunction, false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`${classes} navSearch`}>
            {searchVisibility === SEARCH_HIDDEN && (
                <button onClick={handleOnToggleSearch2}>
                    <span className="sr-only">Toggle Search</span>
                    <FaSearch />
                </button>
            )}
            {searchVisibility === SEARCH_VISIBLE && (
                <form ref={formRef} action="/search" data-search-is-active={!!query}>
                    <input
                        type="search"
                        name="q"
                        value={query || ''}
                        onChange={handleOnSearch}
                        autoComplete="off"
                        placeholder="Search..."
                        required
                    />
                    <div className='navSearchResults'>
                        {results.length > 0 && (
                            <ul>
                                {results.map(({ slug, title }, index) => {
                                    return (
                                        <li key={slug}>
                                            <Link tabIndex={index} href={`/blog/${slug}`}>
                                                {title}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        {results.length === 0 && (
                            <p>
                                Sorry, not finding anything for <strong>{query}</strong>
                            </p>
                        )}
                    </div>
                </form>
            )}
        </div>
    )
}