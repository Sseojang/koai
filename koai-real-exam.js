(function(){
  const objective=(topic,d,question,opts,ans,exp)=>({
    topic,d,q:`<p>${question}</p>`,opts,ans,exp
  });
  const objectiveHtml=(topic,d,question,opts,ans,exp)=>({
    topic,d,q:question,opts,ans,exp
  });
  const essay=(topic,question,exp)=>({
    topic,d:3,type:'essay',q:question,exp
  });

  const data=[
    objectiveHtml("Python 가변 기본 인자",2,`<p>다음 파이썬 코드의 실행 결과로 옳은 것은?</p>
<pre>def f(x, lst=[]):
    lst.append(x)
    return lst

a = f(1)
b = f(2)
print(b)</pre>`,
      ["[2]","[1, 2]","[1]","TypeError 발생"],1,
      "기본 인자 리스트는 함수가 정의될 때 한 번 생성되어 호출 사이에 공유됩니다. 첫 호출 뒤 <code>[1]</code>, 두 번째 호출 뒤 <code>[1, 2]</code>가 되므로 ②가 맞습니다."),
    objective("NumPy 배열 축 연산",2,"NumPy 배열 <code>a = np.array([[1, 2, 3], [4, 5, 6]])</code>에 대한 설명으로 옳지 않은 것은?",
      ["a.shape는 (2, 3)이다.","a.sum(axis=0)의 결과는 [5, 7, 9]이다.","a.sum(axis=1)의 결과는 [6, 15]이다.","a.reshape(3, 2)는 원본 배열의 메모리를 항상 새로 할당한다."],3,
      "<code>reshape</code>는 가능한 경우 원본 메모리를 공유하는 view를 반환하므로 항상 새 메모리를 할당하지 않습니다."),
    objective("Seaborn jointplot",1,"두 연속 변수 간의 분포와 관계를 동시에 시각화하기에 가장 적합한 seaborn 함수는?",
      ["sns.barplot","sns.lineplot","sns.jointplot","sns.countplot"],2,
      "<code>jointplot</code>은 두 변수의 관계와 각 변수의 주변 분포를 한 화면에 함께 표시합니다."),
    objective("scikit-learn Estimator",1,"scikit-learn의 estimator 인터페이스에 대한 설명으로 옳은 것은?",
      ["fit()은 비지도 학습 모델에서는 사용할 수 없다.","predict()는 모든 모델에서 확률값을 반환한다.","transform()은 데이터를 변환하는 transformer 클래스에서 제공된다.","score()는 회귀 모델에서 항상 RMSE를 반환한다."],2,
      "전처리기와 차원 축소기 같은 transformer는 학습된 기준으로 데이터를 바꾸는 <code>transform()</code>을 제공합니다."),
    objective("PyTorch Autograd",2,"PyTorch의 autograd에 관한 설명으로 옳은 것은?",
      ["모든 텐서는 기본적으로 requires_grad=True로 생성된다.","loss.backward() 뒤 gradient가 .grad에 누적되므로 학습 루프에서 zero_grad()로 초기화해야 한다.","torch.no_grad() 안에서도 gradient가 자동 계산된다.","detach()는 텐서 값을 0으로 만든다."],1,
      "PyTorch gradient는 기본적으로 누적됩니다. 반복마다 <code>optimizer.zero_grad()</code> 등으로 이전 gradient를 지워야 합니다."),
    objective("PyTorch 축 교환",1,"shape가 (4, 3, 32, 32)인 텐서 x의 0번 축과 1번 축을 교환해 (3, 4, 32, 32)로 만드는 연산은?",
      ["x.view(3, 4, 32, 32)","x.reshape(3, 4, 32, 32)","x.transpose(0, 1)","x.squeeze(0)"],2,
      "<code>transpose(0, 1)</code>는 지정한 두 축을 교환합니다. reshape는 원소 배치 해석을 바꾸지만 축 전치와 같지 않습니다."),
    objective("GPU 학습 오류",2,"GPU에서의 모델 학습과 관련된 설명으로 옳은 것은?",
      ["CUDA out of memory는 배치가 너무 크거나 메모리 사용이 누적될 때 흔히 발생한다.","Expected all tensors to be on the same device는 PyTorch 버전 호환성 문제이다.","GPU 학습은 데이터 전송 비용과 무관하게 항상 CPU보다 빠르다.",".to('cuda')는 평가 모드로만 전환한다."],0,
      "GPU 메모리 부족은 큰 배치, 큰 모델, 불필요한 계산 그래프 보존 등으로 발생할 수 있습니다."),
    objective("선형회귀 정규방정식",2,"선형회귀의 정규방정식이 유일한 해를 갖기 위한 조건으로 가장 옳은 것은?",
      ["X의 행 수가 열 수보다 작아야 한다.","XᵀX가 가역 행렬이어야 한다.","y가 정규분포를 따라야 한다.","X의 모든 원소가 양수여야 한다."],1,
      "정규방정식 <code>(XᵀX)⁻¹Xᵀy</code>을 직접 사용하려면 <code>XᵀX</code>가 가역이어야 합니다."),
    objective("로지스틱 회귀 손실",1,"이진 분류용 로지스틱 회귀에서 일반적으로 사용하는 손실 함수는?",
      ["평균제곱오차","이진 교차엔트로피","힌지 손실","Huber 손실"],1,
      "이진 로지스틱 회귀는 Bernoulli likelihood에 대응하는 이진 교차엔트로피를 주로 사용합니다."),
    objective("L1과 L2 정규화",2,"L1 정규화와 L2 정규화의 차이로 옳은 것은?",
      ["L1은 가중치를 정확히 0으로 만들 수 있어 특성 선택 효과가 있고, L2는 가중치를 줄이지만 보통 0으로 만들지는 않는다.","L2만 가중치를 0으로 만든다.","둘 다 모든 가중치를 항상 0으로 만든다.","두 정규화는 수학적으로 완전히 동일하다."],0,
      "L1은 절댓값 패널티의 비미분점 때문에 희소한 해를 만들 수 있고, L2는 계수를 부드럽게 축소합니다."),
    objective("K-NN의 K",2,"K-NN 분류기에서 K값에 따른 일반적인 동작으로 옳은 것은?",
      ["K가 작을수록 결정 경계가 더 부드러워진다.","K=1이면 학습 데이터 정확도는 매우 높지만 과대적합 위험이 크다.","K가 매우 크면 과대적합이 심해진다.","K-NN은 학습 단계에서 분포 파라미터를 추정하는 매개변수적 방법이다."],1,
      "K가 작으면 국소 잡음에 민감해 경계가 복잡해지고, K가 커지면 경계가 부드러워져 과소적합 위험이 커집니다."),
    objective("의사결정 트리 분기",2,"분류 의사결정 트리의 분기 기준으로 일반적으로 사용되는 지표가 아닌 것은?",
      ["지니 불순도","엔트로피 또는 정보이득","분산","코사인 유사도"],3,
      "출제 의도상 정답은 ④ 코사인 유사도입니다. 다만 엄밀히는 분산도 주로 회귀 트리의 기준이므로, 이 문항은 ③과 ④의 구분이 다소 애매합니다."),
    objective("Bagging과 Boosting",2,"배깅과 부스팅에 대한 설명으로 옳지 않은 것은?",
      ["Bagging은 약한 학습기를 병렬적으로 학습할 수 있다.","Boosting은 이전 학습기의 오차를 다음 학습기가 보완하도록 순차 학습한다.","Random Forest는 Bagging과 특성 무작위 추출을 결합한다.","Gradient Boosting은 모든 트리를 동시에 학습해 평균을 낸다."],3,
      "Gradient Boosting은 앞 모델의 잔차나 손실 gradient를 다음 모델이 보완하도록 순차적으로 학습합니다."),
    objective("SVM 커널과 마진",2,"SVM의 마진과 커널 트릭에 대한 설명으로 옳은 것은?",
      ["결정 경계와 가장 가까운 점들의 거리를 최소화한다.","커널 트릭은 고차원 특성을 반드시 명시적으로 계산한다.","RBF 커널은 매우 높은 차원의 특성 공간에 대응하는 효과를 낼 수 있다.","C가 클수록 오분류 허용이 커지고 마진이 넓어진다."],2,
      "커널은 고차원 사상에서의 내적을 직접 사상하지 않고 계산합니다. 큰 C는 오분류를 더 강하게 벌해 보통 마진을 좁힙니다."),
    objective("K-means 특성",2,"K-means 알고리즘의 특성으로 옳지 않은 것은?",
      ["군집 수 K를 미리 정해야 한다.","초기 중심에 따라 결과가 달라질 수 있다.","비볼록 형태의 군집을 잘 찾아낸다.","각 군집은 centroid로 표현된다."],2,
      "K-means는 유클리드 거리와 평균 중심을 사용하므로 구형에 가까운 군집에 적합하고 복잡한 비볼록 군집에는 약합니다."),
    objective("PCA",2,"PCA에 대한 설명으로 옳은 것은?",
      ["주성분은 공분산 행렬에서 큰 고유값에 대응하는 고유벡터이다.","PCA는 비선형 차원 축소 기법이다.","PCA는 항상 분류 정확도를 높인다.","PCA 전에는 표준화가 전혀 필요 없다."],0,
      "PCA는 데이터 분산을 가장 많이 설명하는 직교 방향을 찾는 선형 차원 축소 기법입니다."),
    objective("t-SNE와 UMAP",2,"t-SNE와 UMAP에 대한 설명으로 옳지 않은 것은?",
      ["둘 다 고차원 데이터 시각화에 자주 쓰인다.","t-SNE는 국소 구조 보존에 강하고 전역 구조는 약할 수 있다.","UMAP은 일반적으로 빠르고 어느 정도 전역 구조도 보존한다.","t-SNE 좌표의 절댓값과 군집 간 절대 거리는 항상 의미가 있다."],3,
      "t-SNE 결과의 축 방향과 절댓값에는 직접 의미가 없고, 멀리 떨어진 군집 사이 거리도 과도하게 해석하면 안 됩니다."),
    objective("DBSCAN",1,"DBSCAN의 특성으로 옳은 것은?",
      ["군집 수 K를 사전에 정해야 한다.","어떤 군집에도 속하지 않는 노이즈 포인트를 식별할 수 있다.","비볼록 군집을 찾을 수 없다.","밀도가 불균일할수록 항상 가장 좋다."],1,
      "DBSCAN은 밀도 기반으로 군집을 만들며 희소 영역의 점을 noise로 표시할 수 있습니다."),
    objective("불균형 분류 지표",1,"양성 표본이 매우 적은 불균형 이진 분류에서 단순 정확도보다 적절한 지표 조합은?",
      ["정확도와 학습 시간","정밀도, 재현율, F1 점수","MSE와 MAE","R²와 결정계수"],1,
      "불균형 분류에서는 양성 탐지 품질을 직접 보는 precision, recall과 그 조화평균 F1이 유용합니다."),
    objective("과대적합 신호",1,"과대적합의 전형적인 신호로 가장 옳은 것은?",
      ["학습 손실은 낮지만 검증 손실이 훨씬 높다.","학습 손실과 검증 손실이 모두 매우 높다.","학습 손실이 검증 손실보다 항상 높다.","손실 곡선이 평탄하게 유지된다."],0,
      "학습 데이터에는 잘 맞지만 보지 못한 검증 데이터에서 성능이 크게 떨어지는 것이 과대적합의 대표 신호입니다."),
    objective("하이퍼파라미터 탐색",2,"하이퍼파라미터 탐색 전략에 대한 설명으로 옳지 않은 것은?",
      ["Grid Search는 차원이 늘수록 조합 수가 급증한다.","Random Search는 적은 시도로 좋은 영역을 찾을 수 있다.","Bayesian Optimization은 이전 결과를 이용해 다음 시도를 고른다.","테스트 셋에서 직접 튜닝하는 것이 가장 정확하다."],3,
      "테스트 셋은 최종 일반화 성능 확인에만 사용해야 합니다. 반복 튜닝에 사용하면 테스트 셋 누수가 생깁니다."),
    objective("k-fold 교차검증",2,"k-fold 교차검증에 대한 설명으로 옳은 것은?",
      ["데이터를 k개로 나누고 매번 한 폴드를 검증에 사용해 k번 반복한다.","k는 항상 2가 최적이다.","LOOCV가 언제나 가장 정확하다.","시계열 데이터에는 임의 분할이 가장 권장된다."],0,
      "각 폴드가 한 번씩 검증 집합이 되도록 반복하며, 시계열은 시간 순서를 지키는 별도 분할이 필요합니다."),
    objective("ROC와 AUC",2,"ROC 곡선과 AUC에 대한 설명으로 옳은 것은?",
      ["ROC의 x축은 precision, y축은 recall이다.","AUC=0.5는 무작위 분류와 비슷한 수준이다.","AUC는 항상 0.5 이상이다.","ROC는 회귀 평가의 표준 도구이다."],1,
      "ROC는 FPR과 TPR의 관계를 나타내며 AUC 0.5는 무작위 순위 수준입니다. 반대로 예측하면 0.5보다 작을 수도 있습니다."),
    objective("피처 엔지니어링",1,"피처 엔지니어링 기법으로 보기 가장 어려운 것은?",
      ["원-핫 인코딩","시계열 슬라이딩 윈도 통계량","PCA 결과를 새 피처로 사용","학습률 스케줄링"],3,
      "학습률 스케줄링은 최적화 전략이며 입력 특성을 생성하거나 변환하는 피처 엔지니어링이 아닙니다."),
    objective("시퀀스 패딩",1,"가변 길이 시퀀스를 미니배치로 학습할 때 일반적으로 사용하는 전처리 기법은?",
      ["모두 가장 짧은 길이로 자른다.","padding과 masking으로 길이를 맞추고 padding 토큰을 무시한다.","평균 길이를 가중치로 곱한다.","항상 2D 이미지로 변환한다."],1,
      "배치 텐서의 길이를 맞추기 위해 padding을 넣고 attention이나 loss에서 mask로 padding 위치를 제외합니다."),

    objective("퍼셉트론 한계",1,"단일 퍼셉트론으로 학습할 수 없는 문제는?",
      ["AND","OR","NOT","XOR"],3,
      "XOR은 하나의 직선으로 두 클래스를 분리할 수 없는 비선형 문제입니다."),
    objective("학습률",1,"경사하강법에서 학습률이 너무 큰 경우 일반적으로 나타나는 현상은?",
      ["손실이 단조 감소한다.","손실이 발산하거나 진동해 수렴하지 못한다.","학습률과 속도는 무관하다.","모든 파라미터가 항상 0이 된다."],1,
      "업데이트 폭이 너무 크면 최솟값 주변을 지나치며 진동하거나 손실이 발산할 수 있습니다."),
    objective("역전파",1,"역전파에 대한 설명으로 옳은 것은?",
      ["출력층에서 입력층 방향으로 연쇄법칙을 사용해 gradient를 계산한다.","입력층에서 출력층 방향으로만 gradient를 계산한다.","미분 없이 무작위 탐색으로만 갱신한다.","활성화가 비미분 가능해도 항상 문제없다."],0,
      "순전파로 계산한 값을 바탕으로 출력에서 입력 방향으로 chain rule을 적용합니다."),
    objective("ReLU",1,"ReLU 활성화 함수의 특징으로 옳지 않은 것은?",
      ["양의 입력에서는 gradient가 1이다.","음의 입력에서 0이 되어 Dying ReLU가 생길 수 있다.","출력이 (0, 1) 범위로 제한된다.","계산이 단순하다."],2,
      "ReLU 출력은 <code>max(0,x)</code>이므로 양수 영역의 상한이 없습니다."),
    objective("손실 함수 사용처",1,"손실 함수의 일반적인 사용처로 옳은 것은?",
      ["회귀에 Cross Entropy","다중 클래스 분류에 Softmax와 Categorical Cross Entropy","이진 분류에 항상 MSE","이상치에 민감해야 하는 회귀에 MAE"],1,
      "다중 클래스 단일 레이블 분류에서는 softmax 확률과 categorical cross entropy를 주로 사용합니다."),
    objective("MLP 비선형성",1,"MLP에서 비선형 활성화 함수가 없으면 발생하는 현상으로 가장 옳은 것은?",
      ["깊게 쌓아도 하나의 선형 변환과 동등해진다.","항상 성능이 좋아진다.","gradient 소실이 완전히 사라진다.","자동으로 CNN이 된다."],0,
      "선형 변환의 합성은 다시 선형 변환이므로 깊이의 표현력 이점이 사라집니다."),
    objective("Embedding",1,"임베딩의 핵심 아이디어로 가장 옳은 것은?",
      ["이산 토큰이나 고차원 입력을 의미 정보를 담은 저차원 연속 벡터로 사상한다.","항상 스칼라 하나로 압축한다.","결측치 대체값이다.","손실 함수의 한 종류이다."],0,
      "embedding은 토큰처럼 이산적인 대상을 학습 가능한 밀집 벡터로 표현합니다."),
    objective("CNN Pooling",1,"CNN에서 pooling의 역할로 옳지 않은 것은?",
      ["공간 해상도를 줄여 계산량을 낮춘다.","작은 평행이동에 어느 정도 강인성을 준다.","일반적인 max/average pooling은 학습 가능한 가중치를 추가한다.","과대적합 완화에 도움을 줄 수 있다."],2,
      "일반적인 max pooling과 average pooling에는 학습 파라미터가 없습니다."),
    objective("Scaled Dot Product Attention",2,"Scaled Dot Product Attention에서 QKᵀ를 √dₖ로 나누는 이유는?",
      ["출력 차원을 줄이기 위해","차원이 커질 때 내적값이 커져 softmax가 포화되는 것을 줄이기 위해","gradient를 0으로 만들기 위해","행렬 곱의 차원을 맞추기 위해"],1,
      "내적 분산이 차원에 따라 커지는 것을 보정해 softmax가 지나치게 뾰족해지는 현상을 줄입니다."),
    objective("Transformer Encoder",1,"표준 Transformer encoder의 구성 요소가 아닌 것은?",
      ["Multi-head self-attention","Positional encoding 또는 embedding","Residual connection과 LayerNorm","Convolutional pooling layer"],3,
      "표준 encoder block은 self-attention과 feed-forward network, residual, normalization으로 구성됩니다."),
    objective("Autoencoder",1,"Autoencoder에 대한 설명으로 옳은 것은?",
      ["입력을 잠재 공간으로 압축한 뒤 복원하는 비지도 또는 자기지도 모델이다.","항상 분류 레이블이 필요하다.","decoder 없이 정의된다.","잠재 차원은 항상 입력보다 커야 한다."],0,
      "encoder가 latent representation을 만들고 decoder가 입력을 재구성하도록 학습합니다."),
    objective("Mini-batch SGD",1,"Mini-batch SGD가 full-batch gradient descent보다 일반적으로 갖는 장점은?",
      ["메모리 효율성과 gradient noise에 따른 일반화 효과","항상 더 낮은 학습 손실","완전히 결정론적인 gradient","학습률 조정이 필요 없음"],0,
      "전체 데이터를 한 번에 올리지 않아도 되고, 적당한 gradient noise가 최적화와 일반화에 도움을 줄 수 있습니다."),
    objective("AdamW",2,"Adam과 AdamW의 차이로 가장 옳은 것은?",
      ["Adam은 momentum을 사용하지 않는다.","AdamW는 weight decay를 gradient 정규화 항과 분리해 파라미터 업데이트에 적용한다.","AdamW는 1차 모멘트만 추정한다.","둘은 완전히 동일하다."],1,
      "AdamW는 decoupled weight decay를 사용해 적응형 gradient update와 가중치 감쇠를 분리합니다."),
    objective("Learning Rate Scheduling",1,"Learning rate scheduling에 대한 설명으로 옳지 않은 것은?",
      ["초반 warmup으로 불안정성을 줄일 수 있다.","Cosine schedule은 후반 학습률을 줄인다.","Step decay는 흔한 방법이다.","모든 모델에서 학습률은 항상 고정하는 것이 가장 좋다."],3,
      "문제와 모델에 따라 warmup, decay 등 변화하는 학습률이 더 안정적이고 좋은 결과를 낼 수 있습니다."),
    objective("Dropout",1,"Dropout에 대한 설명으로 옳은 것은?",
      ["학습 시 일부 뉴런을 확률적으로 비활성화해 과대적합을 줄인다.","추론 시에도 같은 방식으로 항상 비활성화한다.","완전연결층에는 적용할 수 없다.","학습 손실을 항상 낮춘다."],0,
      "학습 중 무작위로 unit을 끄지만 일반적인 추론에서는 전체 unit을 사용하고 스케일을 보정합니다."),
    objective("가중치 초기화",2,"신경망의 가중치 초기화에 대한 설명으로 옳은 것은?",
      ["모든 가중치를 0으로 두면 같은 층 뉴런이 동일하게 학습되는 대칭성 문제가 생긴다.","Xavier 초기화는 ReLU에 가장 적합하다.","He 초기화는 sigmoid에 가장 적합하다.","초기화는 학습에 거의 영향이 없다."],0,
      "동일한 0 초기화는 뉴런의 대칭을 깨지 못합니다. 보통 Xavier는 tanh/sigmoid 계열, He는 ReLU 계열에 사용합니다."),
    objective("Batch Normalization",2,"Batch Normalization에 대한 설명으로 옳지 않은 것은?",
      ["미니배치 평균과 분산으로 활성화를 정규화한다.","학습 안정성과 수렴에 도움을 줄 수 있다.","추론 시 running mean과 variance를 사용한다.","배치 크기와 무관하며 매우 작은 배치에서 더 잘 작동한다."],3,
      "BatchNorm 통계는 배치 크기에 영향을 받으며 매우 작은 배치에서는 불안정해질 수 있습니다."),
    objective("LoRA와 PEFT",2,"LoRA와 같은 PEFT의 핵심 아이디어로 가장 옳은 것은?",
      ["모든 파라미터를 항상 새로 학습한다.","큰 가중치 변화량을 저랭크 행렬로 근사해 일부 파라미터만 학습한다.","학습 데이터를 압축한다.","출력층을 제거한다."],1,
      "LoRA는 원래 가중치를 대부분 고정하고 작은 저랭크 adapter만 학습해 메모리와 계산량을 줄입니다."),

    objective("Convolution",1,"Convolution layer의 특성으로 옳지 않은 것은?",
      ["같은 필터를 위치에 공유해 translation equivariance를 갖는다.","같은 입력 크기에서 보통 완전연결층보다 파라미터가 적다.","kernel, stride, padding으로 출력 크기를 조절한다.","모든 입력 위치마다 별도 필터를 사용한다."],3,
      "합성곱의 핵심은 동일 필터의 공간적 공유입니다."),
    objective("Transfer Learning",1,"ImageNet 사전학습 모델을 작은 이미지 데이터셋에 적용할 때 일반적으로 권장되는 방법은?",
      ["무작위 가중치로 처음부터만 학습한다.","사전학습 가중치로 시작해 분류기 또는 일부 레이어를 fine-tuning한다.","사전학습을 버리고 더 큰 모델을 만든다.","데이터 증강을 쓰지 않는다."],1,
      "작은 데이터에서는 사전학습 표현을 재사용하고 필요한 일부만 미세조정하는 것이 효과적입니다."),
    objective("YOLO와 DETR",2,"YOLO 계열과 DETR의 차이로 가장 옳은 것은?",
      ["YOLO는 single-stage 탐지 계열이고 DETR은 transformer와 set prediction을 사용한다.","DETR은 grid 기반이고 YOLO는 transformer 기반이다.","둘 다 RPN이 핵심이다.","YOLO는 항상 정확도가 비교 불가능하게 낮다."],0,
      "DETR은 object query와 bipartite matching을 이용한 set prediction을 사용합니다."),
    objective("U-Net",1,"U-Net의 핵심 구조로 옳은 것은?",
      ["Encoder-decoder 구조와 같은 해상도 단계 사이의 skip connection","Transformer decoder만으로 구성","Pooling이 전혀 없음","출력이 항상 스칼라"],0,
      "U-Net은 내려가는 encoder와 올라가는 decoder 사이에 skip connection을 연결해 위치 정보를 복원합니다."),
    objective("ResNet",1,"ResNet의 핵심 아이디어로 가장 옳은 것은?",
      ["Residual connection으로 매우 깊은 네트워크 학습을 쉽게 한다.","Convolution 없이 fully connected layer만 사용한다.","Pooling을 전혀 사용하지 않는다.","Sigmoid만 사용한다."],0,
      "잔차 연결은 층이 identity mapping을 쉽게 학습하게 해 깊은 모델의 최적화를 돕습니다."),
    objective("Image Augmentation",1,"일반적인 image augmentation 기법이 아닌 것은?",
      ["Random horizontal flip","Random resized crop","Color jitter","이미지에 픽셀별 정답 annotation을 직접 표시"],3,
      "annotation은 정답 레이블 작성 과정이며 입력 변형을 만드는 데이터 증강이 아닙니다."),
    objective("GAN",1,"GAN에 대한 설명으로 옳은 것은?",
      ["Generator와 discriminator가 경쟁하는 minimax game으로 학습한다.","Discriminator가 진짜 데이터를 생성한다.","Discriminator 없이 generator만 학습한다.","항상 안정적으로 수렴한다."],0,
      "Generator는 가짜 데이터를 만들고 discriminator는 진짜와 가짜를 구분하며 서로 경쟁합니다."),
    objective("비전 자기지도 학습",1,"비전 분야의 self-supervised learning에 해당하는 방법은?",
      ["ImageNet 라벨 분류","SimCLR·MoCo 대조학습 또는 MAE 마스킹 학습","분할 마스크 지도학습","K-NN 분류만 수행"],1,
      "대조학습과 masked image modeling은 사람이 붙인 클래스 라벨 없이 학습 신호를 구성합니다."),
    objective("CLIP",1,"CLIP에 대한 설명으로 가장 옳은 것은?",
      ["이미지와 텍스트를 공유 임베딩 공간에 대조학습해 zero-shot 분류에 활용할 수 있다.","이미지만 다룬다.","픽셀 분할 전용이다.","항상 이미지 클래스 라벨이 필요하다."],0,
      "CLIP은 대응 이미지-텍스트 쌍을 가깝게 학습해 텍스트 설명을 분류 기준으로 사용할 수 있습니다."),
    objective("Diffusion Model",1,"Diffusion model의 일반적인 학습 방식으로 가장 옳은 것은?",
      ["데이터에 점진적으로 Gaussian noise를 더하고 그 역과정의 denoising을 학습한다.","GAN처럼 discriminator와 반드시 경쟁한다.","분류 손실만 사용한다.","한 번의 forward로 무작위 이미지를 그대로 출력한다."],0,
      "정방향 노이즈 과정은 정해져 있고, 모델은 noisy sample에서 noise 또는 깨끗한 방향을 예측하도록 학습합니다."),

    objective("텍스트 분류 파이프라인",1,"텍스트 분류 파이프라인의 일반적인 흐름으로 가장 옳은 것은?",
      ["Tokenization → embedding/encoding → classifier head","Classifier head → tokenization → embedding","Embedding → tokenization → classifier head","Classifier를 세 번 연결"],0,
      "문자열을 토큰으로 바꾸고 표현 벡터를 만든 뒤 분류기가 최종 클래스를 예측합니다."),
    objective("BERT 사전학습",1,"BERT의 대표적인 사전학습 목표는?",
      ["Masked Language Modeling","왼쪽에서 오른쪽 다음 토큰 예측만 사용","분류 정확도 직접 최적화","강화학습 보상 최대화"],0,
      "BERT는 양방향 문맥을 활용해 가려진 토큰을 복원하는 MLM을 핵심 목표로 사용합니다."),
    objective("Autoregressive LM",1,"자기회귀 언어 모델의 학습 방식으로 옳은 것은?",
      ["이전 토큰이 주어졌을 때 다음 토큰 분포를 예측한다.","미래 토큰으로 과거만 예측한다.","토큰 순서를 무시하고 분류만 한다.","항상 MSE만 사용한다."],0,
      "GPT 계열은 앞 토큰들을 조건으로 다음 토큰의 확률을 최대화합니다."),
    objective("기계번역 Encoder-Decoder",1,"기계번역에서 encoder-decoder 구조의 역할로 옳은 것은?",
      ["Encoder가 원문을 표현으로 바꾸고 decoder가 목표 언어 문장을 생성한다.","둘 다 분류만 한다.","Decoder는 입력을 그대로 복사한다.","Attention을 사용할 수 없다."],0,
      "Encoder는 source context를 만들고 decoder는 이를 참고해 target token을 순차 생성합니다."),
    objective("LLM 응용",1,"대규모 사전학습 언어 모델을 응용 과제에 적용하는 방법으로 적절하지 않은 것은?",
      ["Zero-shot 또는 few-shot prompting","Instruction tuning","LoRA 등 PEFT","모든 응용에서 항상 처음부터 새로 학습"],3,
      "대규모 모델을 매 과제마다 처음부터 학습하는 것은 비용이 매우 크며 일반적으로 비효율적입니다."),
    objective("HuBERT",2,"HuBERT와 같은 자기지도 오디오 인코더의 학습 방식으로 가장 옳은 것은?",
      ["일부 프레임을 masking하고 사전 clustering의 pseudo-label을 예측한다.","모든 오디오에 사람의 전사 라벨이 필요하다.","출력은 항상 단일 클래스다.","오디오를 pixel 단위로 예측한다."],0,
      "HuBERT는 비라벨 오디오의 마스킹 구간에서 군집 기반 hidden unit을 예측합니다."),
    objective("Whisper",1,"OpenAI Whisper에 대한 설명으로 가장 옳은 것은?",
      ["다국어 오디오의 transcription과 translation을 수행하는 encoder-decoder transformer이다.","텍스트만 입력받는다.","Speaker diarization만 한다.","TTS 전용이다."],0,
      "Whisper는 log-Mel spectrogram을 입력받아 전사 또는 영어 번역 텍스트를 생성합니다."),

    essay("과대적합과 과소적합",`<p>머신러닝 모델 학습에서 다음 물음에 답하시오.</p>
<p>(1) 과대적합과 과소적합을 각각 설명하고 학습·검증 성능으로 구분하는 방법을 쓰시오.</p>
<p>(2) 학습 정확도 99%, 검증 정확도 70%인 모델은 어느 쪽인지 이유와 함께 설명하시오.</p>
<p>(3) 이 모델을 개선하는 방법 두 가지와 각각의 이유를 쓰시오.</p>`,
      `<strong>모범답안</strong><br><br>
과대적합은 모델이 학습 데이터의 규칙뿐 아니라 잡음까지 지나치게 외워 학습 성능은 높지만 새로운 데이터의 성능이 낮은 상태이다. 학습 정확도와 검증 정확도의 차이가 크거나, 학습 손실은 계속 감소하는데 검증 손실이 증가하면 과대적합으로 판단한다.<br><br>
과소적합은 모델이 데이터의 기본 규칙도 충분히 학습하지 못한 상태이다. 이때는 학습 성능과 검증 성능이 모두 낮고 두 손실이 함께 큰 경우가 많다.<br><br>
학습 정확도 99%, 검증 정확도 70%인 모델은 과대적합이다. 학습 데이터에는 거의 완벽히 맞지만 보지 못한 검증 데이터에서는 29%p 낮아 일반화 격차가 크기 때문이다.<br><br>
개선 방법의 예는 다음과 같다. 첫째, L1/L2 정규화나 dropout을 적용해 모델이 특정 특징에 과도하게 의존하지 못하게 한다. 둘째, 데이터 증강 또는 더 많은 학습 데이터를 사용해 다양한 사례를 학습하게 한다. 이 밖에도 모델 크기 축소, 조기 종료, 올바른 교차검증이 가능하다.<br><br>
<strong>채점 핵심</strong>: 두 개념 정의, 학습·검증 격차 해석, 99%/70% 사례의 과대적합 판정, 서로 다른 개선 방법 두 가지와 이유.`),
    essay("NumPy K-NN 구현",`<p>NumPy만 사용하여 K-NN 분류기의 예측 함수 <code>knn_predict(X_train, y_train, X_test, k=5)</code>를 작성하시오.</p>
<p>유클리드 거리를 사용하고, k개 이웃의 다수결로 예측하되 동률이면 작은 레이블을 선택한다. 반환 shape은 (m,)이다.</p>`,
      `<strong>모범답안</strong>
<pre>import numpy as np

def knn_predict(X_train, y_train, X_test, k=5):
    predictions = []

    for x in X_test:
        distances = np.sqrt(np.sum((X_train - x) ** 2, axis=1))
        neighbor_idx = np.argsort(distances)[:k]
        neighbor_labels = y_train[neighbor_idx]

        counts = np.bincount(neighbor_labels)
        predictions.append(np.argmax(counts))

    return np.asarray(predictions, dtype=int)</pre>
<code>X_train - x</code>는 broadcasting으로 모든 학습 샘플과 현재 테스트 샘플의 좌표 차이를 계산한다. 제곱합의 제곱근이 유클리드 거리이며, <code>argsort</code>의 앞 k개가 가장 가까운 이웃이다. 정수 레이블을 <code>bincount</code>로 세고 <code>argmax</code>를 사용하면 동률일 때 가장 작은 인덱스, 즉 작은 레이블이 선택된다.<br><br>
<strong>채점 핵심</strong>: 거리 계산, 가까운 k개 선택, 다수결, 동률 처리, (m,) 정수 배열 반환.`),
    essay("Transformer Attention",`<p>Transformer의 attention에 대해 답하시오.</p>
<p>(1) Self-attention이 하는 일을 설명하시오.</p>
<p>(2) <code>softmax(QKᵀ / √dₖ)V</code>에서 √dₖ로 나누는 이유를 쓰시오.</p>
<p>(3) Multi-head attention을 사용하는 이유를 쓰시오.</p>
<p>(4) 토큰 순서 정보를 넣는 대표 방법을 쓰시오.</p>`,
      `<strong>모범답안</strong><br><br>
Self-attention은 각 토큰이 같은 시퀀스의 모든 토큰과 관련도를 계산하고, 관련도가 높은 토큰의 value 정보를 더 많이 모아 새로운 표현을 만드는 연산이다. Query는 현재 토큰이 찾는 정보, Key는 각 토큰이 가진 표지, Value는 실제로 전달할 정보로 이해할 수 있다.<br><br>
key 차원 dₖ가 커지면 Q와 K의 내적 분산도 커져 softmax 입력이 지나치게 큰 양수와 음수가 될 수 있다. 그러면 softmax가 거의 one-hot처럼 포화되어 gradient가 작아지고 학습이 불안정해진다. √dₖ로 나누면 내적 크기를 안정적인 범위로 맞출 수 있다.<br><br>
Multi-head attention은 서로 다른 projection 공간에서 여러 종류의 관계를 동시에 학습한다. 한 head는 가까운 문법 관계, 다른 head는 장거리 의존성처럼 서로 다른 패턴에 집중할 수 있어 표현력이 커진다.<br><br>
Self-attention만으로는 입력 순서를 구분하지 못하므로 positional encoding 또는 학습 가능한 positional embedding을 토큰 표현에 더한다.<br><br>
<strong>채점 핵심</strong>: 가중합과 문맥화, softmax 포화 방지, 여러 관계의 병렬 학습, 위치 인코딩.`),
    essay("Diffusion Model",`<p>Diffusion model에 대해 답하시오.</p>
<p>(1) 정방향 과정과 학습 필요 여부를 설명하시오.</p>
<p>(2) 역방향 과정과 이미지 생성 단계가 어느 과정인지 설명하시오.</p>
<p>(3) 학습 시 신경망의 입력과 예측 대상을 설명하시오.</p>
<p>(4) 생성 시 여러 단계의 denoising이 필요한 이유를 설명하시오.</p>`,
      `<strong>모범답안</strong><br><br>
정방향 과정은 깨끗한 이미지에 작은 Gaussian noise를 여러 단계에 걸쳐 더해 최종적으로 거의 순수한 noise로 만드는 과정이다. noise schedule과 확률식으로 미리 정해지므로 별도의 신경망 학습이 필요한 과정은 아니다.<br><br>
역방향 과정은 noisy image에서 noise를 조금씩 제거해 더 깨끗한 표본으로 이동하는 과정이다. 새 이미지를 생성할 때는 무작위 noise에서 시작해 학습된 모델로 역방향 과정을 반복한다.<br><br>
학습 시 신경망은 특정 시간 단계 t의 noisy image, 시간 정보 t, 조건부 모델이라면 text 같은 조건을 입력받는다. 일반적인 DDPM에서는 원본에 더해진 noise를 예측하도록 학습하며, 변형에 따라 깨끗한 이미지나 velocity를 예측하기도 한다.<br><br>
한 단계는 전체 noise를 한꺼번에 제거하는 것이 아니라 현재 noise 수준에서의 작은 복원 방향을 예측한다. 여러 단계로 나누면 복잡한 데이터 분포를 안정적으로 따라갈 수 있으므로 반복 denoising이 필요하다.<br><br>
<strong>채점 핵심</strong>: 고정된 정방향 noise 과정, 학습된 역방향 생성, noisy sample과 timestep 입력, 반복 복원의 이유.`),
    essay("BERT와 GPT 및 PEFT",`<p>사전학습 언어 모델에 대해 답하시오.</p>
<p>(1) BERT와 GPT를 사용하는 Transformer 부분과 사전학습 목표 측면에서 비교하시오.</p>
<p>(2) 감성 분류에서 BERT fine-tuning과 대규모 LLM few-shot prompting이 각각 유리한 상황을 한 가지씩 쓰시오.</p>
<p>(3) PEFT와 LoRA의 아이디어 및 메모리·계산 절감 이유를 설명하시오.</p>`,
      `<strong>모범답안</strong><br><br>
BERT는 주로 Transformer encoder를 사용하며 양쪽 문맥을 동시에 보는 Masked Language Modeling으로 사전학습한다. 일부 버전은 문장 관계 목표를 추가한다. GPT는 주로 causal Transformer decoder를 사용하며 이전 토큰들이 주어졌을 때 다음 토큰을 예측하는 autoregressive language modeling으로 사전학습한다.<br><br>
레이블이 충분하고 반복 추론 비용을 낮추며 일정한 분류 성능이 필요하면 BERT-base를 task data로 fine-tuning하는 방식이 유리하다. 반면 레이블이 매우 적거나 여러 과제를 빠르게 시험하고 별도 학습 인프라가 부족하면 대규모 LLM에 few-shot prompt를 주는 방식이 유리하다.<br><br>
PEFT는 거대한 사전학습 모델 전체를 갱신하지 않고 작은 추가 파라미터나 일부 파라미터만 학습하는 방법이다. LoRA는 큰 가중치 행렬의 변화량을 두 개의 작은 저랭크 행렬의 곱으로 표현한다. 원래 가중치를 고정하므로 전체 모델의 gradient와 optimizer state를 저장할 필요가 줄고, 학습 파라미터 수도 크게 감소해 GPU 메모리와 계산량이 절약된다.<br><br>
<strong>채점 핵심</strong>: encoder와 MLM, causal decoder와 next-token prediction, 두 적용 방식의 상황별 장점, 일부 파라미터 학습과 저랭크 분해.`)
  ];

  window.KOAI_REAL_EXAM={
    id:2026,
    label:'실전 예시',
    title:'KOAI 2026 실전 예시문제',
    subtitle:'KOAI 제공 예시문제 기반 · 선택형 60문항 자동채점 + 서술형 5문항 상세 모범답안 · 고등부 1~4과목',
    source:'KOAI 2026 예시문제 PDF',
    sections:[
      {name:'1과목',full:'1과목 · 기초 역량 및 고전 머신러닝',subj:'1과목',start:0,count:25},
      {name:'2과목',full:'2과목 · 신경망 및 딥러닝',subj:'2과목',start:25,count:18},
      {name:'3과목',full:'3과목 · 컴퓨터 비전',subj:'3과목',start:43,count:10},
      {name:'4과목',full:'4과목 · 자연어 처리 및 오디오',subj:'4과목',start:53,count:7},
      {name:'서술형',full:'서술형 · 5문항',subj:'1~4과목',start:60,count:5}
    ],
    data
  };
})();
