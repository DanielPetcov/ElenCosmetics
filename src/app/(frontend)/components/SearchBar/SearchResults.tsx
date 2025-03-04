"use client"; // This makes it a Client Component

import { stringify } from 'qs-esm'
import type { Where } from 'payload'

import { Product } from "@/payload-types";
import { useState, useEffect } from "react";

import SearchItem from './SearchItem';

const SearchResults = ({ word }: { word: string }) => {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const query: Where = {
        title: {
            contains: word
        },
    }

    const stringifiedQuery = stringify(
        {
            where: query,
            limit: 12
        },
        { addQueryPrefix: true },
    )

    useEffect(() => {
        const fetchResults = async () => {
            if (word.length < 2) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(`/api/products${stringifiedQuery}`);
                const data = await res.json();
                setResults(data.docs);
            } catch (error) {

                setResults([]);
            }
            setLoading(false);
        };

        fetchResults();
    }, [word]);


    return (
        <div className="text-gray-700 w-full bg-white p-5 rounded-md grid grid-cols-4 gap-5 overflow-y-auto max-h-[500px]">
            {loading ? (
                <div>Loading...</div>
            ) : results && results.length > 0 ? (
                results.map((doc: Product, index) =>
                    <div key={index}>
                        <SearchItem product={doc} />
                    </div>)
            ) : (
                <div>No results found</div>
            )}
        </div>
    );
};

export default SearchResults;
