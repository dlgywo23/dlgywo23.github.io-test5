document.addEventListener('DOMContentLoaded', () => {
    // === 1. State & Configuration ===
    const state = {
        currentArea: 'manufacturing', // manufacturing, construction, transportation, communication, biotech
        currentTab: 'lesson',
        jsonReady: false,
        technologyData: [],
        quizScore: 0
    };

    const areaConfig = {
        manufacturing: {
            title: '제조기술 (Manufacturing Technology)',
            color: '#AEC6CF',
            video: 't0yI4BjVVUA',
            rubricTopic: '카프라(Kapla) 구조물 제작 실습',
            keywords: '제조기술'
        },
        construction: {
            title: '건설기술 (Construction Technology)',
            color: '#FFCC80',
            video: 'xG9aN7_CbX4',
            rubricTopic: '종이 기둥 하중 실험',
            keywords: '건설기술'
        },
        transportation: {
            title: '수송기술 (Transportation Technology)',
            color: '#98FB98',
            video: 'c0bfmj6pRNA',
            rubricTopic: '에그카(Egg Car) 충돌 실험',
            keywords: '수송기술'
        },
        communication: {
            title: '통신기술 (Communication Technology)',
            color: '#CAB5D3',
            video: '_gTVdQeCZw0',
            rubricTopic: 'NFC 태그 활용 실습',
            keywords: '통신기술'
        },
        biotech: {
            title: '생물기술 (Biotechnology)',
            color: '#FFAB91',
            video: 'RrpqdPiCRm4',
            rubricTopic: '생명 기술 발달사 조사 및 발표',
            keywords: '생명기술'
        }
    };

    // === 2. Data Content (Simulated for Lesson & Quiz) ===

    // Lesson Text Data (Synthesized based on curriculum)
    const lessonData = {
        manufacturing: `
            <div class="lesson-chapter">
                <h3>1-1. 제조기술의 이해</h3>
                <p>제조기술은 인간이 생활에 필요한 제품을 만들기 위해 재료를 가공하고 처리하는 수단과 활동을 의미합니다.</p>
                <div class="image-placeholder">[그림] 제조기술 시스템 모델 (투입-과정-산출-되먹임)</div>
                <p>현대 제조기술은 단순 가공을 넘어 재료 과학, 정밀 공학, 그리고 정보 통신 기술이 융합된 형태로 발전하고 있습니다.</p>
            </div>
            <div class="lesson-chapter">
                <h3>1-2. 재료의 특성과 가공</h3>
                <p>목재, 금속, 플라스틱 등 다양한 재료의 성질을 이해하고 적합한 가공법(절삭, 성형, 주조 등)을 선택해야 합니다.</p>
                <div class="image-placeholder">[그림] 금속 가공 공정 예시</div>
            </div>
            <div class="lesson-chapter">
                <h3>1-3. 첨단 제조기술</h3>
                <p>스마트 팩토리와 3D 프린팅 기술은 다품종 소량 생산을 가능하게 하며 제조 혁신을 이끌고 있습니다.</p>
                <p><strong>스마트 팩토리:</strong> IoT와 AI를 활용하여 생산 전 과정을 최적화하는 지능형 공장입니다.</p>
            </div>
        `,
        construction: `
            <div class="lesson-chapter">
                <h3>2-1. 건설기술의 체계</h3>
                <p>건설기술은 쾌적하고 안전한 생활 공간을 만들기 위해 구조물을 짓는 기술로, 토목과 건축으로 나뉩니다.</p>
                <div class="image-placeholder">[그림] 건설 구조물의 분류</div>
            </div>
            <div class="lesson-chapter">
                <h3>2-2. 구조와 하중</h3>
                <p>구조물은 고정하중, 적재하중, 풍하중, 지진하중 등 다양한 힘을 견뎌야 합니다. 트러스, 아치, 라멘 구조 등이 사용됩니다.</p>
            </div>
            <div class="lesson-chapter">
                <h3>2-3. 미래 건설기술</h3>
                <p>제로에너지 빌딩(ZEB)은 에너지 소비를 최소화하고 신재생 에너지를 생산하여 에너지 자립을 목표로 합니다.</p>
            </div>
        `,
        transportation: `
            <div class="lesson-chapter">
                <h3>3-1. 수송기술의 발달</h3>
                <p>수송기술은 사람이나 물건을 한 장소에서 다른 장소로 효율적으로 이동시키는 기술입니다.</p>
            </div>
            <div class="lesson-chapter">
                <h3>3-2. 수송 수단과 동력</h3>
                <p>내연기관에서 전기 모터, 수소 연료 전지로 동력원이 변화하고 있습니다.</p>
                <div class="image-placeholder">[그림] 하이브리드 vs 전기차 구동 원리</div>
            </div>
            <div class="lesson-chapter">
                <h3>3-3. 자율주행과 UAM</h3>
                <p>도심 항공 모빌리티(UAM)와 완전 자율주행 기술은 미래 교통 혼잡을 해결할 핵심 솔루션입니다.</p>
            </div>
        `,
        communication: `
            <div class="lesson-chapter">
                <h3>4-1. 통신과 미디어</h3>
                <p>정보를 수집, 가공, 전달하는 모든 기술을 통신기술이라 합니다. 유선에서 무선, 아날로그에서 디지털로 발전했습니다.</p>
            </div>
            <div class="lesson-chapter">
                <h3>4-2. 네트워크와 보안</h3>
                <p>5G, WiFi, IoT 등 초연결 사회에서는 정보 보안과 암호화 기술이 필수적입니다.</p>
                <div class="image-placeholder">[그림] IoT 네트워크 구성도</div>
            </div>
            <div class="lesson-chapter">
                <h3>4-3. 통신 윤리</h3>
                <p>디지털 저작권 존중과 사이버 예절은 기술적 발전만큼 중요한 요소입니다.</p>
            </div>
        `,
        biotech: `
            <div class="lesson-chapter">
                <h3>5-1. 생명기술의 세계</h3>
                <p>생명체가 가진 기능을 활용하여 인간에게 유용한 물질을 만들거나 서비스를 제공하는 기술입니다.</p>
            </div>
            <div class="lesson-chapter">
                <h3>5-2. 유전자와 세포</h3>
                <p>유전자 재조합, 세포 융합, 조직 배양 등의 기술을 통해 품종 개량과 신약 개발이 이루어집니다.</p>
                <div class="image-placeholder">[그림] 유전자 가위 기술(CRISPR) 개념도</div>
            </div>
            <div class="lesson-chapter">
                <h3>5-3. 미래 생명기술</h3>
                <p>스마트 팜은 ICT를 접목하여 농작물 생육 환경을 자동 제어하며, 바이오 에너지는 화석 연료를 대체합니다.</p>
            </div>
        `
    };

    const rubricData = {
        manufacturing: [
            { category: '기획', levels: ['도면이 구체적이고 치수가 정확함', '도면이 있으나 치수 누락', '도면 없음'] },
            { category: '제작(구조)', levels: ['3층 이상 쌓았으며 흔들림 없음', '3층 이상이나 불안정함', '3층 미만'] },
            { category: '미적 요소', levels: ['독창적인 패턴 적용', '일반적인 쌓기 방식', '단조로움'] },
            { category: '태도', levels: ['안전수칙 준수 및 정리정돈 우수', '보통', '재료 낭비 및 정리 미흡'] }
        ],
        construction: [
            { category: '설계', levels: ['하중 분산 원리(트러스 등) 적용', '기둥 배치 적절', '단순 기둥 배치'] },
            { category: '견고성', levels: ['전공책 5권 이상 지지', '3~4권 지지', '3권 미만 붕괴'] },
            { category: '경제성', levels: ['A4용지 2장 이내 사용', '3장 사용', '4장 이상 과다 사용'] },
            { category: '태도', levels: ['협동심 우수', '보통', '참여 저조'] }
        ],
        transportation: [
            { category: '안전 설계', levels: ['크럼플 존(충격흡수) 구조 반영', '완충재만 사용', '보호 장치 미흡'] },
            { category: '주행 성능', levels: ['목표 지점까지 직진 주행', '경로 이탈하나 도착', '주행 불가'] },
            { category: '달걀 보존', levels: ['달걀 파손 없음', '실금 발생', '완전 파손'] },
            { category: '태도', levels: ['적극적 참여', '보통', '소극적'] }
        ],
        communication: [
            { category: '기능 구현', levels: ['NFC 태그 인식 및 앱 실행 원활', '인식 지연', '작동 실패'] },
            { category: '창의성', levels: ['생활 속 유용한 기능 자동화', '단순 URL 연결', '기본 기능'] },
            { category: '발표', levels: ['원리 설명 명확', '설명 다소 부족', '설명 미흡'] },
            { category: '태도', levels: ['도구 사용 능숙', '보통', '미숙'] }
        ],
        biotech: [
            { category: '자료 조사', levels: ['다양한 출처와 정확한 정보', '일반적 정보', '부정확한 정보'] },
            { category: '이해력', levels: ['기술의 원리와 영향 분석 우수', '단순 나열', '내용 이해 부족'] },
            { category: '발표 자료', levels: ['시각 자료 활용 우수', '텍스트 위주', '자료 부실'] },
            { category: '태도', levels: ['발표 태도 진지함', '보통', '산만함'] }
        ]
    };

    const quizData = {
        manufacturing: [
            { q: "제조기술 시스템의 단계 중 완성된 제품을 평가하고 개선하는 단계는?", a: ["투입", "산출", "과정", "되먹임(Feedback)"], correct: 3 },
            { q: "다음 중 적층 제조 방식(Additive Manufacturing)에 해당하는 것은?", a: ["선반 가공", "3D 프린팅", "사출 성형", "단조"], correct: 1 },
            { q: "스마트 팩토리의 핵심 기술이 아닌 것은?", a: ["IoT", "빅데이터", "수동 제어", "CPS(사이버물리시스템)"], correct: 2 },
            { q: "재료의 성질 중 힘을 가했을 때 깨지지 않고 늘어나는 성질은?", a: ["취성", "전성", "연성", "강성"], correct: 2 },
            { q: "삼성전자와 SK하이닉스가 주력하는 제조 분야는?", a: ["조선", "반도체", "섬유", "식품"], correct: 1 },
            { q: "금속을 녹여 틀에 부어 제품을 만드는 가공법은?", a: ["주조", "소성", "용접", "절삭"], correct: 0 },
            { q: "다음 중 열가소성 플라스틱에 해당하지 않는 것은?", a: ["PE", "PP", "PVC", "페놀 수지"], correct: 3 },
            { q: "미래 제조 기술의 특징으로 적절한 것은?", a: ["소품종 대량생산", "환경 오염 무시", "친환경 맞춤형 생산", "수작업 중심"], correct: 2 },
            { q: "합금의 장점이 아닌 것은?", a: ["강도 증가", "내식성 향상", "녹는점 낮아짐", "전기 전도도 항상 증가"], correct: 3 },
            { q: "제도 용구 중 T자의 주 용도는?", a: ["원 그리기", "각도 측정", "수평선 긋기", "곡선 긋기"], correct: 2 }
        ],
        construction: [
            { q: "삼각형 구조를 기본으로 하여 힘을 분산시키는 구조는?", a: ["라멘 구조", "트러스 구조", "일체식 구조", "조적호 구조"], correct: 1 },
            { q: "구조물 자체의 무게를 뜻하는 하중은?", a: ["적재 하중", "고정 하중", "풍하중", "적설 하중"], correct: 1 },
            { q: "시멘트, 물, 모래 만을 섞은 것은?", a: ["콘크리트", "철근 콘크리트", "모르타르", "아스팔트"], correct: 2 },
            { q: "제로 에너지 빌딩의 필수 요소가 아닌 것은?", a: ["고단열", "고기밀", "화석 연료 발전", "신재생 에너지"], correct: 2 },
            { q: "현대건설, 삼성물산 등이 수행하는 대규모 공공 시설 공사를 뜻하는 말은?", a: ["인테리어", "토목 공사", "리모델링", "플랜트"], correct: 1 },
            { q: "다음 중 건설 구조물의 생산 과정 순서는?", a: ["설계-기획-시공-관리", "기획-설계-시공-관리", "시공-기획-관리-설계", "설계-시공-기획-관리"], correct: 1 },
            { q: "주택 건설 시 고려할 자연 환경 조건이 아닌 것은?", a: ["일조", "통풍", "지진대", "주변 상가 유무"], correct: 3 },
            { q: "DDP(동대문디자인플라자)와 같은 비정형 건축물 설계에 쓰이는 기술은?", a: ["CAD", "BIM", "CAM", "GIS"], correct: 1 },
            { q: "압축력을 받는 부재로만 구성된 곡선형 구조는?", a: ["아치", "현수", "트러스", "라멘"], correct: 0 },
            { q: "콘크리트의 단점인 인장력을 보완하기 위해 넣는 재료는?", a: ["자갈", "철근", "벽돌", "유리"], correct: 1 }
        ],
        transportation: [
            { q: "내연 기관의 4행정 사이클 순서는?", a: ["흡입-폭발-압축-배기", "흡입-압축-폭발-배기", "폭발-흡입-압축-배기", "배기-흡입-압축-폭발"], correct: 1 },
            { q: "친환경 자동차가 아닌 것은?", a: ["하이브리드차", "전기차", "디젤차", "수소연료전지차"], correct: 2 },
            { q: "도심 항공 모빌리티를 뜻하는 약어는?", a: ["SUV", "UAM", "KTX", "GPS"], correct: 1 },
            { q: "비행기가 뜨는 힘(양력)을 설명하는 원리는?", a: ["파스칼의 원리", "베르누이의 정리", "작용 반작용", "관성의 법칙"], correct: 1 },
            { q: "현대자동차 아이오닉5의 주 동력원은?", a: ["가솔린 엔진", "전기 모터", "증기 기관", "제트 엔진"], correct: 1 },
            { q: "자율주행 레벨 중 운전자의 개입 없이 시스템이 모든 상황을 제어하는 단계는?", a: ["레벨 1", "레벨 2", "레벨 5", "레벨 0"], correct: 2 },
            { q: "선박의 평형을 유지해주는 장치는?", a: ["프로펠러", "키", "밸러스트 수(평형수)", "닻"], correct: 2 },
            { q: "드론의 비행 원리 중 제자리 비행을 뜻하는 용어는?", a: ["이륙", "착륙", "호버링(Hovering)", "피칭"], correct: 2 },
            { q: "하이브리드 자동차(HEV)의 특징은?", a: ["엔진과 모터 병행", "외부 충전 필수", "배기가스 0", "수소 연료 사용"], correct: 0 },
            { q: "우주 발사체(누리호 등)의 추진 원리는?", a: ["양력", "마찰력", "작용 반작용", "전자기력"], correct: 2 }
        ],
        communication: [
            { q: "IoT의 뜻으로 올바른 것은?", a: ["International of Technology", "Internet of Things (사물인터넷)", "Input of Text", "Inside of Telco"], correct: 1 },
            { q: "다음 중 무선 통신 기술이 아닌 것은?", a: ["Wi-Fi", "Bluetooth", "LTE", "광섬유 케이블"], correct: 3 },
            { q: "5G 통신의 특징이 아닌 것은?", a: ["초고속", "초저지연", "초연결", "협대역"], correct: 3 },
            { q: "정보 보안의 3요소가 아닌 것은?", a: ["기밀성", "무결성", "가용성", "경제성"], correct: 3 },
            { q: "카카오, 네이버가 제공하는 클라우드 서비스의 장점은?", a: ["데이터 로컬 저장만 가능", "인터넷 연결 시 어디서나 접속", "보안 취약", "하드웨어 비용 증가"], correct: 1 },
            { q: "NFC 기술이 주로 사용되는 분야는?", a: ["장거리 통신", "위성 방송", "교통카드 결제", "해저 케이블"], correct: 2 },
            { q: "블록체인 기술의 특징은?", a: ["중앙 집중형", "데이터 위변조 어려움", "속도가 매우 빠름", "보안이 약함"], correct: 1 },
            { q: "저작권(Copyright)에 위배되는 행위는?", a: ["무료 배포 SW 사용", "영화 불법 다운로드", "출처 밝히고 인용", "직접 찍은 사진 게시"], correct: 1 },
            { q: "송신자가 보낸 정보를 수신자가 해석하는 과정은?", a: ["부호화(Encoding)", "복호화(Decoding)", "전송", "피드백"], correct: 1 },
            { q: "증강현실(AR)의 예시는?", a: ["VR 게임", "포켓몬 GO", "3D 영화", "홀로그램"], correct: 1 }
        ],
        biotech: [
            { q: "원하는 유전자만 잘라내고 교정하는 기술은?", a: ["조직 배양", "유전자 가위(CRISPR)", "핵 치환", "발효"], correct: 1 },
            { q: "식물을 흙 없이 영양액으로 재배하는 방식은?", a: ["수경 재배", "노지 재배", "화분 재배", "유기농 재배"], correct: 0 },
            { q: "줄기세포(Stem Cell)의 특징은?", a: ["분화 능력 없음", "모든 조직으로 분화 가능성", "이미 죽은 세포", "바이러스의 일종"], correct: 1 },
            { q: "발효 기술을 이용한 식품이 아닌 것은?", a: ["김치", "요구르트", "치즈", "두부"], correct: 3 },
            { q: "삼성바이오로직스의 주 사업인 CDO/CMO는 무엇과 관련있나?", a: ["바이오 의약품 생산 대행", "의료기기 판매", "병원 운영", "건강보험"], correct: 0 },
            { q: "GMO(유전자 변형 생물)의 논란 점은?", a: ["생산량 감소", "생태계 교란 우려", "가격 폭등", "맛이 없음"], correct: 1 },
            { q: "백신이 우리 몸에서 하는 역할은?", a: ["병원균 직접 사멸", "면역 체계 훈련(항체 생성)", "체온 상승", "영양 공급"], correct: 1 },
            { q: "생명 기술의 윤리적 문제와 거리가 먼 것은?", a: ["복제 인간", "유전자 차별", "동물 실험", "스마트폰 중독"], correct: 3 },
            { q: "바이오매스(Biomass) 에너지의 원료는?", a: ["우라늄", "석유", "식물/동물 폐기물", "수소 가스"], correct: 2 },
            { q: "조직 배양 기술의 장점은?", a: ["바이러스 감염 없는 묘목 대량 생산", "유전적 다양성 증가", "재배 시간 연장", "노동력 증가"], correct: 0 }
        ]
    };

    // === 3. Functions ===

    // Initialize
    function init() {
        bindEvents();
        updateAreaUI('manufacturing'); // Default
        loadCompanyData();
    }

    // Load JSON Data
    async function loadCompanyData() {
        try {
            const response = await fetch('./technology_data.json');
            if (!response.ok) throw new Error("JSON Fetch Failed");
            state.technologyData = await response.json();
            state.jsonReady = true;
            renderCompanyList();
        } catch (error) {
            console.error(error);
            const container = document.getElementById('company-list');
            container.innerHTML = `<p style="color:red;">⚠ 데이터 로딩 실패. (로컬 실행 시 Live Server를 사용하거나 GitHub Pages에 배포해야 작동합니다.)<br>오류: ${error.message}</p>`;
        }
    }

    // Bind Click Events
    function bindEvents() {
        // Nav Clicks
        document.querySelectorAll('#main-nav li').forEach(li => {
            li.addEventListener('click', (e) => {
                const area = e.target.dataset.area;
                updateAreaUI(area);
            });
        });

        // Tab Clicks
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                switchTab(tab);
            });
        });

        // Quiz Submit
        document.getElementById('submit-quiz').addEventListener('click', checkQuiz);
    }

    // Update UI based on Area Selection
    function updateAreaUI(areaKey) {
        state.currentArea = areaKey;
        const config = areaConfig[areaKey];

        // Active Nav
        document.querySelectorAll('#main-nav li').forEach(li => {
            li.classList.toggle('active', li.dataset.area === areaKey);
        });

        // Title & Color
        document.getElementById('area-title').textContent = config.title;
        document.documentElement.style.setProperty('--primary-color', config.color);

        // Update Content Sections (Reset to lesson tab)
        switchTab('lesson');
        document.getElementById('lesson-text').innerHTML = lessonData[areaKey];

        // Update Video
        const videoFrame = document.getElementById('video-frame');
        videoFrame.src = `https://www.youtube.com/embed/${config.video}`;

        // Update Rubric
        renderRubric(areaKey);

        // Update Company List (if loaded)
        renderCompanyList();

        // Reset Quiz
        renderQuiz(areaKey);
    }

    // Switch Sub-tabs
    function switchTab(tabKey) {
        state.currentTab = tabKey;

        // Buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabKey);
        });

        // Panels
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === tabKey);
        });
    }

    // Render Company List (Filtered by Area)
    function renderCompanyList() {
        if (!state.jsonReady) return;

        const container = document.getElementById('company-list');
        const keywords = areaConfig[state.currentArea].keywords; // e.g., '제조기술'

        // Filter Data
        const filtered = state.technologyData.filter(item => item['기술분야'] === keywords);

        container.innerHTML = filtered.map(item => `
            <div class="company-card">
                <div class="company-name">${item['기업명']}</div>
                <div class="company-biz">${item['주요 사업 및 수행 업무']}</div>
            </div>
        `).join('');
    }

    // Render Rubric Table
    function renderRubric(areaKey) {
        const tableBody = document.querySelector('#rubric-table tbody');
        const data = rubricData[areaKey];

        tableBody.innerHTML = data.map(row => `
            <tr>
                <td><strong>${row.category}</strong></td>
                <td>${row.levels[0]}</td>
                <td>${row.levels[1]}</td>
                <td>${row.levels[2]}</td>
            </tr>
        `).join('');
    }

    // Render Quiz
    function renderQuiz(areaKey) {
        const container = document.getElementById('quiz-container');
        const questions = quizData[areaKey];
        state.quizScore = 0;
        document.getElementById('score-display').textContent = '결과 대기 중...';
        document.getElementById('submit-quiz').style.display = 'block';

        container.innerHTML = questions.map((q, index) => `
            <div class="quiz-card" id="q-card-${index}">
                <div class="quiz-question">${index + 1}. ${q.q}</div>
                <div class="quiz-options" data-index="${index}">
                    ${q.a.map((opt, i) => `
                        <button onclick="selectOption(${index}, ${i})">${opt}</button>
                    `).join('')}
                </div>
                <div class="quiz-feedback" id="feedback-${index}"></div>
            </div>
        `).join('');
    }

    // Global function for option selection (attached to window for HTML access)
    window.selectOption = function (qIndex, optIndex) {
        const optionsDiv = document.querySelector(`.quiz-options[data-index="${qIndex}"]`);
        optionsDiv.querySelectorAll('button').forEach((btn, i) => {
            if (i === optIndex) btn.classList.add('selected');
            else btn.classList.remove('selected');
        });
    };

    // Check Quiz Answers
    function checkQuiz() {
        const questions = quizData[state.currentArea];
        let score = 0;
        let allAnswered = true;

        questions.forEach((q, index) => {
            const optionsDiv = document.querySelector(`.quiz-options[data-index="${index}"]`);
            const selectedBtn = optionsDiv.querySelector('.selected');
            const feedbackDiv = document.getElementById(`feedback-${index}`);
            const card = document.getElementById(`q-card-${index}`);

            if (!selectedBtn) {
                // Not answered
                // allAnswered = false; // Optional enforcement
            }

            // Get selected index
            let selectedIndex = -1;
            if (selectedBtn) {
                const buttons = Array.from(optionsDiv.children);
                selectedIndex = buttons.indexOf(selectedBtn);
            }

            // Logic
            if (selectedIndex === q.correct) {
                score++;
                card.classList.add('correct');
                card.classList.remove('wrong');
                feedbackDiv.style.display = 'block';
                feedbackDiv.innerHTML = `<span style="color:green">✔ 정답입니다!</span>`;
            } else {
                card.classList.add('wrong');
                card.classList.remove('correct');
                feedbackDiv.style.display = 'block';
                feedbackDiv.innerHTML = `<span style="color:red">✘ 오답입니다.</span> 정답: <strong>${q.a[q.correct]}</strong>`;
            }
        });

        // Final Score
        const display = document.getElementById('score-display');
        display.textContent = `최종 점수: ${score} / ${questions.length}`;

        // Hide button to prevent re-submit spam or change text
        document.getElementById('submit-quiz').style.display = 'none';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Run Init
    init();
});
