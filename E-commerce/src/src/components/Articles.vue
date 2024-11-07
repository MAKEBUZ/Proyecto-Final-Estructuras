<script>
export default {
    
    name: 'Articles',
    data() {
        return {
            articles: [
                { id: 1, title: 'Article 1', content: 'Content for article 1' },
                { id: 2, title: 'Article 2', content: 'Content for article 2' },
                // Add more articles as needed
            ]
        };
    }
};
</script>

<template>
    <div class="articles">
        <h1>Articles</h1>
        <div v-for="article in articles" :key="article.id" class="article">
            <h2>{{ article.title }}</h2>
            <p>{{ article.content }}</p>
        </div>
    </div>
</template>

<style scoped>
.articles {
    padding: 20px;
}

.article {
    margin-bottom: 20px;
}

.article h2 {
    margin: 0;
    font-size: 1.5em;
}

.article p {
    margin: 0.5em 0 0;
}
</style>