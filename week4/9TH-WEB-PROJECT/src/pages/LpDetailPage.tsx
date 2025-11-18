import React from 'react';
import { useParams } from 'react-router-dom';
import { useLpDetail } from '../hooks/useLpDetail'; 

const LpDetailPage: React.FC = () => {
  const { lpid } = useParams<{ lpid: string }>();

  const { 
    data: lpData, 
    isLoading, 
    isError, 
    error 
  } = useLpDetail(lpid);

  if (isLoading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>로딩 중...</div>; 
  }

  if (isError) {
    return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>에러 발생: {error.message}</div>;
  }

  if (!lpData) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>LP 정보를 불러오지 못했습니다.</div>;
  }
  
  return (
    <div className="lp-detail-page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      
      <section className="lp-header-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#888', fontSize: '0.9em' }}>{lpData.createdAt?.substring(0, 10) || '1일 전'}</span> 
        </div>

        <div className="lp-edit-actions">
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2em' }} title="수정">✏️</button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2em', marginLeft: '10px' }} title="삭제">🗑️</button>
        </div>
      </section>

      <section className="lp-title-section" style={{ marginBottom: '25px' }}>
        <h1 className="lp-title" style={{ fontSize: '2em', margin: '0' }}>{lpData.title}</h1>
      </section>
      
            <section className="lp-image-section" style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        {lpData.thumbnail && (
          <div className="lp-image-wrapper" style={{ 
            width: '300px', 
            height: '300px', 
            overflow: 'hidden',
          }}>
            <img src={lpData.thumbnail} alt={lpData.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
      </section>

      <section className="lp-content-section" style={{ marginBottom: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
        <div className="lp-body" style={{ fontSize: '1em', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          <p className="lp-body-text">{lpData.content}</p>
        </div>
      </section>

      <section className="lp-actions-footer" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button className="btn-like" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5em', color: 'pink' }}>
          ❤️ {lpData.likeCount ?? 0}
        </button>
      </section>

    </div>
  );
};

export default LpDetailPage;