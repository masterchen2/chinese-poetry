document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const categories = document.querySelectorAll('.category');
    const poetryTitle = document.querySelector('.poetry-title');
    const poetryAuthor = document.querySelector('.poetry-author');
    const poetryText = document.querySelector('.poetry-text');
    const randomBtn = document.querySelector('.random-btn');
    
    // 当前选中的类别
    let currentCategory = null;
    
    // 诗词数据缓存
    const poetryCache = {};
    
    // 为每个类别添加点击事件
    categories.forEach(category => {
        category.addEventListener('click', function() {
            // 移除之前选中的类别的active类
            categories.forEach(c => c.classList.remove('active'));
            // 为当前选中的类别添加active类
            this.classList.add('active');
            
            // 获取类别类型
            currentCategory = this.getAttribute('data-type');
            
            // 加载并显示诗词
            loadAndDisplayPoetry(currentCategory);
        });
    });
    
    // 为随机按钮添加点击事件
    randomBtn.addEventListener('click', function() {
        if (currentCategory) {
            loadAndDisplayPoetry(currentCategory);
        } else {
            poetryTitle.textContent = '请先选择一个诗词分类';
            poetryAuthor.textContent = '';
            poetryText.textContent = '';
        }
    });
    
    // 加载并显示诗词的函数
    async function loadAndDisplayPoetry(category) {
        try {
            // 显示加载状态
            poetryTitle.textContent = '加载中...';
            poetryAuthor.textContent = '';
            poetryText.textContent = '';
            
            // 如果缓存中没有该类别的数据，则加载数据
            if (!poetryCache[category]) {
                await loadPoetryData(category);
            }
            
            // 如果数据加载成功，则随机显示一首诗词
            if (poetryCache[category] && poetryCache[category].length > 0) {
                displayRandomPoetry(category);
            } else {
                poetryTitle.textContent = '暂无数据';
            }
        } catch (error) {
            console.error('加载诗词失败:', error);
            poetryTitle.textContent = '加载失败，请重试';
        }
    }
    
    // 加载诗词数据的函数
    async function loadPoetryData(category) {
        // 根据不同类别加载不同的数据
        switch (category) {
            case 'tang':
                // 唐诗数据 - 加载所有唐诗文件
                const tangData = [];
                // 根据文件命名规则，唐诗文件从0开始，每隔1000递增，最大到57000
                for (let i = 0; i <= 57000; i += 1000) {
                    try {
                        const response = await fetch(`chinese-poetry/全唐诗/poet.tang.${i}.json`);
                        const data = await response.json();
                        // 合并数据
                        tangData.push(...data);
                    } catch (error) {
                        console.error(`加载唐诗文件 poet.tang.${i}.json 失败:`, error);
                    }
                }
                poetryCache[category] = tangData;
                break;
            case 'song':
                // 宋词数据 - 加载所有宋词文件
                const songData = [];
                // 根据文件命名规则，宋词文件从0开始，每隔1000递增，最大到17000
                for (let i = 0; i <= 17000; i += 1000) {
                    try {
                        const response = await fetch(`chinese-poetry/宋词/ci.song.${i}.json`);
                        const data = await response.json();
                        // 合并数据
                        songData.push(...data);
                    } catch (error) {
                        console.error(`加载宋词文件 ci.song.${i}.json 失败:`, error);
                    }
                }
                poetryCache[category] = songData;
                break;
            case 'shijing':
                // 诗经数据
                const shijingResponse = await fetch('chinese-poetry/诗经/shijing.json');
                poetryCache[category] = await shijingResponse.json();
                break;
            case 'chuci':
                // 楚辞数据
                const chuciResponse = await fetch('chinese-poetry/楚辞/chuci.json');
                poetryCache[category] = await chuciResponse.json();
                break;
            case 'yuanqu':
                // 元曲数据
                const yuanquResponse = await fetch('chinese-poetry/元曲/yuanqu.json');
                poetryCache[category] = await yuanquResponse.json();
                break;
            case 'caocao':
                // 曹操诗集数据
                const caocaoResponse = await fetch('chinese-poetry/曹操诗集/caocao.json');
                poetryCache[category] = await caocaoResponse.json();
                break;
            case 'nalan':
                // 纳兰词数据
                const nalanResponse = await fetch('chinese-poetry/纳兰性德/纳兰性德诗集.json');
                poetryCache[category] = await nalanResponse.json();
                break;
            case 'shuimotangshi':
                // 水墨唐诗数据
                const shuimotangshiResponse = await fetch('chinese-poetry/水墨唐诗/shuimotangshi.json');
                poetryCache[category] = await shuimotangshiResponse.json();
                break;
            case 'wudai':
                // 五代诗词数据
                const wudaiResponse = await fetch('chinese-poetry/五代诗词/nantang/poetrys.json');
                poetryCache[category] = await wudaiResponse.json();
                break;
            case 'lunyu':
                // 论语数据
                const lunyuResponse = await fetch('chinese-poetry/论语/lunyu.json');
                poetryCache[category] = await lunyuResponse.json();
                break;
            // 蒙学菜单项已被删除
            // case 'mengxue':
            //     // 蒙学数据代码已移除
            //     break;
            case 'youmengying':
                // 幽梦影数据
                const youmengyingResponse = await fetch('chinese-poetry/幽梦影/youmengying.json');
                poetryCache[category] = await youmengyingResponse.json();
                break;
            case 'sishu':
                // 四书五经数据 - 加载所有四书五经文件
                const sishuData = [];
                // 加载大学
                const daxueResponse = await fetch('chinese-poetry/四书五经/daxue.json');
                const daxueData = await daxueResponse.json();
                sishuData.push(daxueData);
                // 加载中庸
                const zhongyongResponse = await fetch('chinese-poetry/四书五经/zhongyong.json');
                const zhongyongData = await zhongyongResponse.json();
                sishuData.push(zhongyongData);
                // 加载孟子
                const mengziResponse = await fetch('chinese-poetry/四书五经/mengzi.json');
                const mengziData = await mengziResponse.json();
                // 孟子是数组格式，需要单独处理
                sishuData.push(...mengziData);
                
                poetryCache[category] = sishuData;
                break;
            case 'quansongshi':
                // 御定全唐詩数据
                const quansongshiResponse = await fetch('chinese-poetry/御定全唐詩/json/001.json');
                poetryCache[category] = await quansongshiResponse.json();
                break;
            default:
                poetryCache[category] = [];
        }
    }
    
    // 显示随机诗词的函数
    function displayRandomPoetry(category) {
        // 获取该类别的诗词数据
        const poetryData = poetryCache[category];
        
        // 随机选择一首诗词
        const randomIndex = Math.floor(Math.random() * poetryData.length);
        const poetry = poetryData[randomIndex];
        
        // 根据不同类别的数据结构，显示不同的内容
        switch (category) {
            case 'tang':
                // 唐诗部分使用繁简转换
                poetryTitle.textContent = convertToSimplified(poetry.title) || '无题';
                poetryAuthor.textContent = `${convertToSimplified(poetry.author) || '佚名'} · ${convertToSimplified(poetry.dynasty) || ''}` ;
                poetryText.textContent = poetry.paragraphs ? convertArrayToSimplified(poetry.paragraphs).join('\n') : '';
                break;
            case 'song':
                poetryTitle.textContent = poetry.rhythmic || poetry.title || '无题';
                poetryAuthor.textContent = `${poetry.author || '佚名'} · ${poetry.dynasty || ''}` ;
                poetryText.textContent = poetry.paragraphs ? poetry.paragraphs.join('\n') : '';
                break;
            case 'shijing':
                poetryTitle.textContent = poetry.title || '无题';
                poetryAuthor.textContent = '诗经';
                poetryText.textContent = poetry.content ? poetry.content.join('\n') : '';
                break;
            case 'chuci':
                poetryTitle.textContent = poetry.title || '无题';
                poetryAuthor.textContent = poetry.author || '佚名';
                poetryText.textContent = poetry.content ? poetry.content.join('\n') : '';
                break;
            case 'yuanqu':
                poetryTitle.textContent = poetry.title || '无题';
                poetryAuthor.textContent = poetry.author || '佚名';
                poetryText.textContent = poetry.paragraphs ? poetry.paragraphs.join('\n') : '';
                break;
            case 'caocao':
                poetryTitle.textContent = poetry.title || '无题';
                poetryAuthor.textContent = '曹操';
                poetryText.textContent = poetry.paragraphs ? poetry.paragraphs.join('\n') : '';
                break;
            case 'nalan':
                poetryTitle.textContent = poetry.title || '无题';
                poetryAuthor.textContent = '纳兰性德';
                poetryText.textContent = poetry.para ? poetry.para.join('\n') : '';
                break;
            case 'shuimotangshi':
                poetryTitle.textContent = poetry.title || '无题';
                poetryAuthor.textContent = poetry.author || '佚名';
                poetryText.textContent = poetry.paragraphs ? poetry.paragraphs.join('\n') : '';
                break;
            case 'wudai':
                poetryTitle.textContent = poetry.title || '无题';
                poetryAuthor.textContent = poetry.author || '佚名';
                poetryText.textContent = poetry.paragraphs ? poetry.paragraphs.join('\n') : '';
                break;
            case 'lunyu':
                poetryTitle.textContent = `论语 · ${poetry.chapter || ''}` ;
                poetryAuthor.textContent = '孔子及弟子';
                poetryText.textContent = poetry.paragraphs ? poetry.paragraphs.join('\n') : '';
                break;
            // 蒙学菜单项已被删除
            // case 'mengxue':
            //     // 蒙学数据处理代码已移除
            //     break;
            case 'youmengying':
                poetryTitle.textContent = '幽梦影';
                poetryAuthor.textContent = '张潮';
                poetryText.textContent = poetry.content || '';
                break;
            case 'sishu':
                // 根据不同的四书五经文件显示不同的标题
                if (poetry.chapter === '大學') {
                    poetryTitle.textContent = '大学';
                } else if (poetry.chapter === '中庸') {
                    poetryTitle.textContent = '中庸';
                } else if (poetry.chapter) {
                    poetryTitle.textContent = poetry.chapter; // 孟子章节
                } else {
                    poetryTitle.textContent = '四书五经';
                }
                poetryAuthor.textContent = '儒家经典';
                // 处理不同格式的内容
                if (poetry.paragraphs) {
                    poetryText.textContent = poetry.paragraphs.join('\n');
                } else if (poetry.content) {
                    poetryText.textContent = poetry.content.join('\n');
                } else {
                    poetryText.textContent = '';
                }
                break;
            case 'quansongshi':
                // 御定全唐詩数据也需要繁简转换
                poetryTitle.textContent = convertToSimplified(poetry.title) || '无题';
                poetryAuthor.textContent = convertToSimplified(poetry.author) || '佚名';
                poetryText.textContent = poetry.paragraphs ? convertArrayToSimplified(poetry.paragraphs).join('\n') : '';
                break;
            default:
                poetryTitle.textContent = '未知类别';
                poetryAuthor.textContent = '';
                poetryText.textContent = '';
        }
    }
    
    // 添加错误处理
    window.addEventListener('error', function(e) {
        console.error('页面加载错误:', e.message);
        alert('加载出错，请检查控制台获取详细信息');
    });
});