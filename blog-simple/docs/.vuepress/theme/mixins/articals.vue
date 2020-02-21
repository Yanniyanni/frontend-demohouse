<script>
import ArticalList from '@theme/components/ArticalList';
import Pagination from '@theme/components/Pagination';
import LabelList from '@theme/components/LabelList';

export default {
    components: { ArticalList, Pagination, LabelList },
    data() {
        return {
            articalList: [],
            currentPage: 1,
            currentTag: 'tags'
        };
    },
    watch: {
        $route() {
            // 存页数
            this._setPage(this._getStoragePage());
            // 存标签
            this._setTag(this._getStorageTag());
        }
    },
    created() {
        this._setPage(this._getStoragePage());
        this._setTag(this._getStorageTag());
    },
    methods: {
        // 分页有关
        getCurrentPage(page) {
            this._setPage(page);
            // setTimeout(() => {
            //     window.scrollTo(0, 0);
            // }, 100);
        },
        _setPage(page) {
            this.currentPage = page;
            this.$page.currentPage = page;
            this._setStoragePage(page);
        },
        _getStoragePage() {
            const path = window.location.pathname;
            const currentPage = JSON.parse(sessionStorage.getItem('currentPage'));

            if (currentPage === null || path !== currentPage.path) {
                sessionStorage.setItem('currentPage', { page: 1, path: '' });
                return 1;
            }

            return parseInt(currentPage.page);
        },
        _setStoragePage(page) {
            const path = window.location.pathname;
            sessionStorage.setItem('currentPage', JSON.stringify({ page, path }));
        },
        // 标签有关
        getCurrentTag(tag) {
            this._setTag(tag.name);
            this.$router.push({ path: tag.path });
        },
        _setTag(tag) {
            this.currentTag = tag;
            this.$page.currentTag = tag;
            this._setStorageTag(tag);
        },
        _getStorageTag() {
            const currentTag = sessionStorage.getItem('currentTag');
            if (currentTag === null || currentTag !== this.$route.meta.id) {
                this._setStorageTag(this.$route.meta.id);
                return this.$route.meta.id;
            }
            return sessionStorage.getItem('currentTag');
        },
        _setStorageTag(tag) {
            sessionStorage.setItem('currentTag', tag);
        },

    }
};
</script>
