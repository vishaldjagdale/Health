import React, { useEffect, useState } from "react";
import { fetchHealthNews } from "../utils/newsService";

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNews = async () => {
            try {
                const newsData = await fetchHealthNews();
                setArticles(newsData);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };
        getNews();
    }, []);

    return (
        <div className="p-20 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">📰 Latest Health News</h2>

            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="animate-pulse bg-gray-800 p-4 rounded-lg shadow-md h-56"></div>
                    ))}
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <div
                                key={index}
                                className="bg-gray-900 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
                            >
                                {article.urlToImage && (
                                    <img
                                        src={article.urlToImage}
                                        alt={article.title}
                                        className="w-full h-40 object-cover rounded-lg mb-3"
                                    />
                                )}
                                <h3 className="text-lg font-semibold">{article.title}</h3>
                                <p className="text-sm text-gray-300 mb-2">{article.description}</p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 font-medium"
                                >
                                    🔗 Read More
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center">No news available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default NewsFeed;
